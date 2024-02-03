import { useEffect, useState } from 'react'

const MatchTheColumns = ({ question, questionNumber }) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/question/options/${question._id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(false);
        setShuffledOptions(data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    loadOptions();
  }, []);
  const [data, setData] = useState({});
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  // console.log(data);
  const colours = ['#ffab56', 'yellow', 'green', 'blue'];

  return (<>
    {question && shuffledOptions && shuffledOptions.length > 0 &&
      <div>
        <h1 className='font-semibold text-2xl text-orange-500'>Question {questionNumber}: Match the Columns</h1>
        <h2 className='text-xl pt-3 pb-1'>{question.title}</h2>
        <div className='flex flex-col max-w-lg mx-auto'>

          <div className='flex pb-1 items-center justify-between'>
            <div className='font-semibold mr-3 text-xl xs:text-2xl invisible'>a)</div>
            <div className='flex flex-auto items-center justify-between'>
              <label className={`text-xl xs:text-2xl w-[105px] sm:w-[140px] text-center text-red-500`} >
                Column A
              </label>
              <label className={`text-xl xs:text-2xl w-[100px] sm:w-[140px] text-center text-gray-500`}>
                Column B
              </label>
            </div>
            <div className='invisible'>(1 Mark)</div>
          </div>

          <div className='flex flex-col gap-3 xs:gap-4'>
            {question.subQuestions.map((subQuestion, index) =>
              <div className='flex items-center justify-between' key={subQuestion._id}>
                <div className='font-semibold mr-1 xs:mr-3 text-xl xs:text-2xl'>{String.fromCharCode(index + 97)})</div>
                <div className='flex flex-auto items-center justify-between'>
                  <label htmlFor={subQuestion._id} className={`text-xl xs:text-2xl shadow-md z-0 rounded-lg p-2 w-[105px] sm:w-[140px] text-center bg-red-500 bg-[${colours[index]}] `} >
                    {subQuestion.question[0]}
                  </label>
                  <input hidden type="number" className='bg-slate-200 p-2 border-b-2 border-black focus:outline-none focus:bg-slate-300' name={subQuestion._id} id={subQuestion._id} onChange={handleChange} />
                  <div className='w-[100px] sm:w-[140px] text-center'>
                    <label htmlFor={subQuestion._id} className={`text-xl xs:text-2xl shadow-md z-0 rounded-lg p-2 inline-block w-[50px] xs:w-[80px] text-center bg-gray-500`}>
                      {shuffledOptions[index]}
                    </label>
                  </div>
                </div>
                <div className='text-slate-600'>({subQuestion.marks} Mark)</div>
              </div>
            )}
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

