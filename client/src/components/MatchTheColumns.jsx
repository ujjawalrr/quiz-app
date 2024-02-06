import { useEffect, useState, useCallback } from 'react'
import { updateAttemptedQuestions } from '../redux/question/questionSlice';
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';

const MatchTheColumns = ({ question, questionNumber, disabled }) => {
  let initialNodes = []
  let initialEdges = [];
  const { attemptedQuestions, checkedQuestions } = useSelector(state => state.question)
  const dispatch = useDispatch()
  const [data, setData] = useState(disabled ? checkedQuestions : attemptedQuestions);
  const bgColours = ['orange', '#ea5151', '#3aaf3a', '#4AAAF8'];
  const colours = ['white', 'white', 'white', 'white'];
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [loading, setLoading] = useState(false);
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
      initialNodes.push({ id: `${question._id}_${subQuestion._id}`, style: { color: colours[index], backgroundColor: bgColours[index] }, resizing: false, sourcePosition: 'right', position: { x: 0, y: 60 * (index) }, data: { label: subQuestion.question[0] }, draggable: false })
    })
    shuffledOptions.map((option, index) => {
      initialNodes.push({ id: `${option}`, targetPosition: 'left', resizing: false, sourcePosition: 'top', position: { x: 250, y: 60 * (index) }, data: { label: option }, draggable: false })
    })
    setNodes(initialNodes);
  }, [shuffledOptions]);
  console.log("nodes: ", nodes)
  console.log("edges: ", edges)

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
    setData({ ...data, [connection.source]: connection.target })
  }
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
      <div>
        <h1 className={`text-[22px] sm:text-2xl text-[#e2854f] ${disabled ? 'font-semibold' : ''} `}>Question {questionNumber}: Match the Columns</h1>
        <h2 className={`text-xl sm:text-2xl pt-0 sm:pt-1 md:pt-3 ${disabled ? 'text-black' : 'text-white font-light'} `}>{question.title}</h2>
        <div className='flex flex-col max-w-lg mx-auto'>
          <div className='flex items-center justify-between w-[350px] xs:w-[450px] sm:w-[500px]'>
            <div className={`text-xl sm:text-2xl w-[105px] sm:w-[140px] text-center text-[#e2854f]`} >
              Column A
            </div>
            <div className={`text-xl sm:text-2xl w-[100px] sm:w-[140px] text-center text-[#e2854f]`}>
              Column B
            </div>
          </div>
          <div className='flex items-center justify-center w-[350px] xs:w-[450px] sm:w-[500px] h-[250px] md:h-[300px]'>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
            />
          </div>

          {/* <div className='flex flex-col gap-3 xs:gap-4'>
            {question.subQuestions.map((subQuestion, index) =>
              <div className='flex items-center justify-between' key={subQuestion._id}>
                <div className='font-semibold mr-1 xs:mr-3 text-xl xs:text-2xl'>{String.fromCharCode(index + 97)})</div>
                <div className='flex flex-auto items-center justify-between'>
                  <label htmlFor={subQuestion._id} className={`text-xl xs:text-2xl shadow-md z-0 rounded-lg p-2 w-[105px] sm:w-[140px] text-center bg-red-500 bg-[${colours[index]}] `} >
                    {subQuestion.question[0]}
                  </label>
                  <input disabled={disabled} hidden type="number" className='bg-slate-200 p-2 border-b-2 border-black focus:outline-none focus:bg-slate-300' name={subQuestion._id} id={subQuestion._id} onChange={handleChange} />
                  <div className='w-[100px] sm:w-[140px] text-center'>
                    <label htmlFor={subQuestion._id} className={`text-xl xs:text-2xl shadow-md z-0 rounded-lg p-2 inline-block w-[50px] xs:w-[80px] text-center bg-gray-500`}>
                      {shuffledOptions[index]}
                    </label>
                  </div>
                </div>
                <div className='text-slate-600'>({subQuestion.marks} Mark)</div>
              </div>
            )}
          </div> */}
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

