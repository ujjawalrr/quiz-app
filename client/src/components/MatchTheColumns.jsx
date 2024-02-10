import { useEffect, useState, useCallback, useRef } from 'react'
import { updateAttemptedQuestions, updateOptionColors } from '../redux/question/questionSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { setBg } from './index.js';

const MatchTheColumns = ({ question, questionNumber, disabled }) => {
  let initialNodes = []
  let initialEdges = [];
  const { attemptedQuestions, checkedQuestions, optionColors } = useSelector(state => state.question)
  const dispatch = useDispatch()
  const [data, setData] = useState(disabled ? checkedQuestions : attemptedQuestions);
  const bgColours = ['orange', '#ea5151', '#3aaf3a', '#4AAAF8'];
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [optionColorsState, setOptionColorsState] = useState(optionColors);
  const [error, setError] = useState(false);
  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/question/options/${question._id}`);
        const resData = await res.json();
        if (resData.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(false);
        setShuffledOptions(resData);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    loadOptions();
  }, []);

  function checkExistense(array, key, value) {
    return array.find(obj => obj[key] === value);
  }
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  useEffect(() => {
    question.subQuestions.map((subQuestion, index) => {
      initialNodes.push({ id: `${question._id}_${subQuestion._id}`, resizing: false, sourcePosition: 'right', position: { x: 0, y: 60 * (index) }, className: 'p-0 text-sm sm:text-xl w-[30%]', data: { label: <div className={`py-1`} style={{ color: 'white', backgroundColor: bgColours[index] }} id={`${question._id}_${subQuestion._id}`}>{subQuestion.question[0]}</div> }, draggable: false })
    })
    shuffledOptions.map((option, index) => {
      initialNodes.push({ id: `${option}`, targetPosition: 'left', resizing: false, sourcePosition: 'top', position: { x: 250, y: 60 * (index) }, className: 'p-0 text-sm sm:text-xl w-[30%]', data: { label: <div className={`py-1`} style={{ backgroundColor: optionColors[`option_${option}`] }} id={`option_${option}`}>{option}</div> }, draggable: false })
    })
    setNodes(initialNodes);
  }, [shuffledOptions]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => {
        applyEdgeChanges(changes, eds)
      })
    },
    [setEdges]
  );

  const updateUI = (connection) => {
    setData({ ...data, [connection.source]: connection.target });
    const source = document.getElementById(connection.source)
    setOptionColorsState({...optionColorsState, [`option_${connection.target}`]: source.style.backgroundColor})
    setBg(`option_${connection.target}`, source.style.backgroundColor)
  }
  useEffect(()=>{
    dispatch(updateOptionColors(optionColorsState))
  }, [optionColorsState]);

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => {
        const updatedEdges = addEdge(connection, eds);
        updateUI(connection);
        return updatedEdges;
      });
    },
    [setEdges, updateUI]
  );

  useEffect(() => {
    dispatch(updateAttemptedQuestions(data));
    initialEdges = [];
    if (disabled) {
      Object.entries(data.evaluatedQuestions).forEach(([key, value]) => {
        let check = checkExistense(question.subQuestions, '_id', key);
        if (check != undefined) {
          initialEdges.push({ id: `e${key}_${value.questionId}-${value.markedAns}`, style: { stroke: value.status ? '#00ff00' : '#ff0000' }, source: `${value.questionId}_${key}`, target: `${value.markedAns}` })
        }
      });
    } else {
      Object.entries(data).forEach(([key, value]) => {
        initialEdges.push({ id: `e${key}-${value}`, source: key, target: value });
      });
    }
    setEdges(initialEdges);
  }, [data, disabled]);

  return (<>
    {question && shuffledOptions && shuffledOptions.length > 0 &&
      <div className='transition-all ease-in-out duration-1000'>
        <h1 className={`text-[22px] sm:text-2xl text-[#e2854f] ${disabled ? 'font-semibold' : ''} `}>Question {questionNumber}: Match the Columns</h1>
        <h2 className={`text-xl sm:text-2xl pt-0 tb:pt-1 xl:pt-2 ${disabled ? 'text-black' : 'text-white font-light'} `}>{question.title}</h2>
        <div className='flex flex-col max-w-lg mx-auto'>
          <div className='flex items-center justify-between w-[350px] xs:w-[450px] sm:w-[500px]'>
            <div className={`text-xl sm:text-2xl w-[105px] sm:w-[140px] text-center text-[#e2854f]`} >
              Column A
            </div>
            <div className={`text-xl sm:text-2xl w-[100px] sm:w-[140px] text-center text-[#e2854f]`}>
              Column B
            </div>
          </div>
          <div className='relative flex items-center justify-center w-[350px] xs:w-[450px] sm:w-[500px] h-[250px]'>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              preventScrolling={false}
              panOnDrag={false}
              selectionOnDrag={false}
              panOnScroll={false}
              translateExtent='[[0, 750], [2750, 2850]]'
            />
          </div>
        </div>
      </div>
    }
    {loading &&
      <p className='text-gray-500 text-2xl'>Loading...</p>
    }
  </>
  )
}

export default MatchTheColumns

