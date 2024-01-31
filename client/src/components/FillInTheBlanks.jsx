import { useState } from 'react'

const FillInTheBlanks = ({ question }) => {
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  console.log(data);
  return (<>
    {question &&
      <div>
        <h1 className='font-semibold text-2xl text-orange-500'>Question 3</h1>
        <h2 className='text-xl py-5'>{question.title}</h2>
        <div className='flex flex-col gap-8'>
          {question.subQuestions.map((subQuestion, index) =>
            <div className='flex gap-3 items-center justify-between' key={subQuestion._id}>
              <div className='font-semibold text-2xl'>{String.fromCharCode(index + 97)})</div>
              <div className='flex flex-auto items-center'>
                <label htmlFor={subQuestion._id} className={`text-2xl w-[140px]`}>
                  {subQuestion.question[0]}
                </label>
                <input type="number" className='bg-slate-200 p-2 border-b-2 border-black focus:outline-none focus:bg-slate-300' name={subQuestion._id} id={subQuestion._id} onChange={handleChange} />
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

export default FillInTheBlanks

