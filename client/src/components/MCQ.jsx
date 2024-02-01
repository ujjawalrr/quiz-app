import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateAttemptedQuestions } from '../redux/question/questionSlice';

const MCQ = ({ question }) => {
  const { attemptedQuestions } = useSelector(state => state.question)
  const dispatch = useDispatch()
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
        <h1 className='font-semibold text-2xl text-orange-500'>Question 1</h1>
        <h2 className='text-xl py-5'>{question.title}</h2>
        <div className='flex flex-col gap-8'>
          {question.subQuestions.map((subQuestion, index) =>
            <div className='flex gap-3 items-center justify-between' key={subQuestion._id}>
              <div className='font-semibold text-2xl'>{String.fromCharCode(index + 97)})</div>
              <div className='flex flex-auto items-center justify-between'>
                {subQuestion.question.map((option, optionIndex) =>
                  <div key={optionIndex}>
                    <label htmlFor={`${subQuestion._id}${optionIndex + 1}`} className={`cursor-pointer text-white text-3xl min-w-20 min-h-20 flex justify-center items-center transition-all duration-700 ease-in-out hover:opacity-90 ${attemptedQuestions[`${question._id}_${subQuestion._id}`] == option ? 'bg-yellow-500 transform scale-125 rounded-full' : 'bg-[#ef7931] hover:scale-105'}`}>
                      {option}
                    </label>
                    <input hidden type="radio" name={`${question._id}_${subQuestion._id}`} id={`${subQuestion._id}${optionIndex + 1}`} value={option} onChange={handleChange} />
                  </div>
                )}
              </div>
              <div>({subQuestion.marks} Mark)</div>
            </div>
          )}
        </div>
      </div>
    }
  </>
  )
}

export default MCQ
