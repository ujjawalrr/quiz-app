import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateAttemptedQuestions } from '../redux/question/questionSlice';

const FillInTheBlanks = ({ question, questionNumber }) => {
  const dispatch = useDispatch();
  const { attemptedQuestions } = useSelector(state => state.question);
  const [data, setData] = useState(attemptedQuestions);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    dispatch(updateAttemptedQuestions(data));
  }, [data]);
  
  return (<>
    {question &&
      <div>
        <h1 className='font-semibold text-2xl text-orange-500'>Question {questionNumber}: Fill in the blanks</h1>
        <h2 className='text-xl pt-3 pb-5'>{question.title}</h2>
        <div className='flex flex-col gap-6 max-w-lg mx-auto'>
          {question.subQuestions.map((subQuestion, index) =>
            <div className='flex gap-3 items-center justify-between' key={subQuestion._id}>
              <div className='font-semibold text-2xl'>{String.fromCharCode(index + 97)})</div>
              <div className='flex flex-auto items-center'>
                <label htmlFor={subQuestion._id} className='text-2xl w-[105px] sm:w-[140px]'>
                  {subQuestion.question[0]}
                </label>
                <input type="number" className={`bg-slate-200 p-2 border-b-2 w-[80px] xs:w-[160px] border-black transition-colors duration-500 ease-in-out focus:outline-none focus:bg-slate-300 ${attemptedQuestions[`${question._id}_${subQuestion._id}`] != '' && attemptedQuestions[`${question._id}_${subQuestion._id}`] != undefined && 'bg-yellow-300 text-white focus:text-black'}`} name={`${question._id}_${subQuestion._id}`} value={attemptedQuestions[`${question._id}_${subQuestion._id}`] || ''} id={subQuestion._id} onChange={handleChange} />
              </div>
              <div className='text-slate-600'>({subQuestion.marks} Mark)</div>
            </div>
          )}
        </div>
      </div>
    }
  </>
  )
}

export default FillInTheBlanks

