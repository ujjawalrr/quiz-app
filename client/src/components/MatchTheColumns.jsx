import { useState } from 'react'

const MatchTheColumns = ({ question }) => {
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const options = question.subQuestions.map(obj => obj.correctAns);
  const shuffledOptions = shuffle(options);

  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  // console.log(data);
  const colours = ['', 'yellow', 'green', 'blue'];

  return (<>
    {question &&
      <div>
        <h1 className='font-semibold text-2xl text-orange-500'>Question 2</h1>
        <h2 className='text-xl py-5'>{question.title}</h2>
        <div className='flex flex-col gap-8'>
          {question.subQuestions.map((subQuestion, index) =>
            <div className='flex gap-3 items-center justify-between' key={subQuestion._id}>
              <div className='font-semibold text-2xl'>{String.fromCharCode(index + 97)})</div>
              <div className='flex flex-auto items-center justify-between'>
                <label htmlFor={subQuestion._id} className={`text-2xl w-[140px] p-3 bg-[${colours[index]}] `} >
                  {subQuestion.question[0]}
                </label>
                <input hidden type="number" className='bg-slate-200 p-2 border-b-2 border-black focus:outline-none focus:bg-slate-300' name={subQuestion._id} id={subQuestion._id} onChange={handleChange} />
                <label htmlFor={subQuestion._id} className={`text-2xl w-[140px] bg-gray-500 p-3`}>
                  {shuffledOptions[index]}
                </label>
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

export default MatchTheColumns

