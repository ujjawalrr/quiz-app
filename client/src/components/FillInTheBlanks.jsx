import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateAttemptedQuestions } from '../redux/question/questionSlice';
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdExposureZero } from "react-icons/md";
import { ImCross } from "react-icons/im";

const FillInTheBlanks = ({ question, questionNumber, disabled }) => {
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
      <div>
        <h1 className='font-semibold text-2xl text-orange-500'>Question {questionNumber}: Fill in the blanks</h1>
        <h2 className='text-xl pt-3 pb-5'>{question.title}</h2>
        <div className='flex flex-col gap-6 max-w-lg mx-auto'>
          {question.subQuestions.map((subQuestion, index) =>
            <div key={subQuestion._id}>
              <div className='flex gap-3 items-center justify-between'>
                <div className='font-semibold text-2xl'>{String.fromCharCode(index + 97)})</div>
                <div className='flex flex-auto items-center'>
                  <label htmlFor={subQuestion._id} className='text-2xl w-[105px] sm:w-[140px]'>
                    {subQuestion.question[0]}
                  </label>
                  <input disabled={disabled} type="number"
                    className={`p-2 border-b-2 w-[80px] xs:w-[160px] border-black transition-colors duration-500 ease-in-out focus:outline-none focus:bg-slate-300 
                ${(!disabled && data[`${question._id}_${subQuestion._id}`] && data[`${question._id}_${subQuestion._id}`] != '' && data[`${question._id}_${subQuestion._id}`] != undefined) ? 'bg-yellow-500 text-white focus:text-black' :
                        (disabled && data[`${subQuestion._id}`] && data[`${subQuestion._id}`].markedAns == subQuestion.correctAns) ? 'bg-green-500 text-white focus:text-black' :
                          (disabled && data[`${subQuestion._id}`] && data[`${subQuestion._id}`].markedAns != subQuestion.correctAns) ? 'bg-red-500 text-white focus:text-black' :
                            'bg-slate-200'
                      }`}
                    name={`${question._id}_${subQuestion._id}`} value={(!disabled && data[`${question._id}_${subQuestion._id}`]) ? data[`${question._id}_${subQuestion._id}`] : (disabled && data[`${subQuestion._id}`]) ? data[`${subQuestion._id}`].markedAns : ''} id={subQuestion._id} onChange={handleChange} />
                        {(disabled && data[`${subQuestion._id}`] && data[`${subQuestion._id}`].markedAns == subQuestion.correctAns) && <FaCheck color='green' className='ml-2' /> }
                        {(disabled && data[`${subQuestion._id}`] && data[`${subQuestion._id}`].markedAns != subQuestion.correctAns) && <ImCross color='red' className='ml-2' /> }
                        {/* {(disabled && !data[`${subQuestion._id}`]) && <MdExposureZero color='yellow' fontSize='30px' /> } */}
                    
                </div>
                <div className='text-slate-600'>
                  ({subQuestion.marks} Mark)
                  {/* <FaCheck color='green' />
                  <RxCross2 color='red' /> */}
                </div>
              </div>
              {disabled &&
                <div>
                  <div>
                    <div className='font-semibold'>Correct Answer: {subQuestion.correctAns}</div>
                    <div>
                      {data[`${subQuestion._id}`] && data[`${subQuestion._id}`].markedAns == subQuestion.correctAns &&
                        <p className='text-green-600'>
                          Your answer is correct.
                        </p>
                      }
                      {data[`${subQuestion._id}`] && data[`${subQuestion._id}`].markedAns != subQuestion.correctAns &&
                        <p className='text-red-600'>
                          Your answer is incorrect.
                        </p>
                      }
                      {!data[`${subQuestion._id}`] &&
                        <p className='text-slate-600'>
                          You haven't attempted this question.
                        </p>
                      }
                    </div>
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

export default FillInTheBlanks

