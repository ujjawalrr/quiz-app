import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateAttemptedQuestions } from '../redux/question/questionSlice';
import VaraText from './VaraText';

const MCQ = ({ question, questionNumber, disabled }) => {
  const { attemptedQuestions, checkedQuestions } = useSelector(state => state.question)
  const dispatch = useDispatch()
  const [data, setData] = useState(disabled ? checkedQuestions : attemptedQuestions);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    dispatch(updateAttemptedQuestions(data));
  }, [data]);

  return (<>
    {question &&
      <div className='transition-all ease-in-out duration-1000'>
        <h1 className={`text-[22px] sm:text-2xl text-[#e2854f] ${disabled ? 'font-semibold' : ''} `}>Question {questionNumber}: Multiple Choice Questions</h1>
        <h2 className={`text-xl sm:text-2xl pt-0 tb:pt-1 xl:pt-2 pb-3 md:pb-5 ${disabled ? 'text-black' : 'text-white font-light'} `}>{question.title}</h2>
        <div className='flex flex-col gap-10'>
          {question.subQuestions.map((subQuestion, index) =>
            <div key={subQuestion._id}>
              <div className='flex gap-3 items-center justify-between'>
              <div className='text-xl sm:text-2xl text-[#e2854f]'>{String.fromCharCode(index + 97)})</div>
                <div className='flex flex-auto items-center justify-between'>
                  {subQuestion.question.map((option, optionIndex) =>
                    <div key={optionIndex} className='relative'>
                      <label htmlFor={`${subQuestion._id}${optionIndex + 1}`}
                        className={`cursor-pointer shadow-md z-0 text-white text-xl min-w-10 min-h-10 xs:text-2xl xs:min-w-16 xs:min-h-16 tb:text-3xl tb:min-w-20 tb:min-h-20 flex justify-center items-center transition-all duration-700 ease-in-out hover:opacity-90 
                        ${(!disabled && data[`${question._id}_${subQuestion._id}`] && data[`${question._id}_${subQuestion._id}`] == option) ? 'bg-[#a45d33] transform scale-125 rounded-full' :
                            (!disabled && data[`${question._id}_${subQuestion._id}`] && data[`${question._id}_${subQuestion._id}`] != option) ? 'bg-[#ef7931] rounded-lg hover:scale-105' :
                              (disabled && data.evaluatedQuestions && data.evaluatedQuestions[`${subQuestion._id}`] && data.evaluatedQuestions[`${subQuestion._id}`].markedAns == option && subQuestion.correctAns == option) ? 'bg-green-500 transform scale-125 rounded-full' :
                                (disabled && data.evaluatedQuestions && data.evaluatedQuestions[`${subQuestion._id}`] && data.evaluatedQuestions[`${subQuestion._id}`].markedAns == option && subQuestion.correctAns != option) ? 'bg-red-500 transform scale-125 rounded-full' :
                                  (disabled && data.evaluatedQuestions && data.evaluatedQuestions[`${subQuestion._id}`] && data.evaluatedQuestions[`${subQuestion._id}`].markedAns != option && subQuestion.correctAns == option) ? 'bg-green-500 transform scale-115 rounded-lg' :
                                    (disabled && !data.evaluatedQuestions[`${subQuestion._id}`] && subQuestion.correctAns == option) ? 'bg-green-500 transform scale-115 rounded-lg' :
                                      'bg-[#ef7931] rounded-lg'
                          }`}
                      >
                        {option}
                      </label>
                      <input disabled={disabled} hidden type="radio" name={`${question._id}_${subQuestion._id}`} id={`${subQuestion._id}${optionIndex + 1}`} value={option} onChange={handleChange} />
                    </div>
                  )}
                </div>
                <div className='text-[#e2854f]'>
                  ({subQuestion.marks} Mark)
                  {/* <FaCheck color='green' />
                  <RxCross2 color='red' /> */}
                </div>
              </div>
              {disabled &&
                <div>
                  <div>
                    <div className='font-semibold'>Correct Answer: {subQuestion.correctAns}</div>
                    {data.evaluatedQuestions[`${subQuestion._id}`] && data.evaluatedQuestions[`${subQuestion._id}`].status == true &&
                      <p className='text-green-600'>
                        Your answer is correct.
                      </p>
                    }
                    {data.evaluatedQuestions[`${subQuestion._id}`] && data.evaluatedQuestions[`${subQuestion._id}`].status == false &&
                      <p className='text-red-600'>
                        Your answer is incorrect.
                      </p>
                    }
                    {!data.evaluatedQuestions[`${subQuestion._id}`] &&
                      <p className='text-slate-600'>
                        You haven't attempted this question.
                      </p>
                    }
                  </div>
                </div>
              }
            </div>
          )}
        </div>
      </div>
    }
  </>
  )
}

export default MCQ
