import { useState } from 'react'

const MCQ = ({ question }) => {
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

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
                    <label htmlFor={`${subQuestion._id}${optionIndex + 1}`} className={`text-white text-2xl min-w-24 min-h-24 flex justify-center items-center transition-all duration-500 ease-in-out ${data[`${subQuestion._id}`] == option ? 'bg-[#ef7931] transform scale-125 skew-x-12 rotate-15' : 'bg-red-500'}`}>
                      {option}
                    </label>
                    <input hidden type="radio" name={subQuestion._id} id={`${subQuestion._id}${optionIndex + 1}`} value={option} onChange={handleChange} />
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
