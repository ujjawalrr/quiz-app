import React from 'react'
import { useEffect, useState } from 'react';
import whiteboard from '../assets/images/whiteboard.png'
import MCQ from '../components/MCQ';
import MatchTheColumns from '../components/MatchTheColumns';
import FillInTheBlanks from '../components/FillInTheBlanks';
import ConfirmSubmitModal from '../components/ConfirmSubmitModal';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const openTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/question`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(false);
        setQuestions(data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    loadQuestions();
  }, []);
  useEffect(() => {
    let count = 0;
    for (let index = 0; index < questions.length; index++) {
      count += questions[index].subQuestions.length;
    }
    setTotalQuestions(count);
  }, [questions]);
  return (
    <div className="container-full flex items-center justify-center h-[100vh] bg-gradient-to-b from-[#4477a6] to-[#91a4b5]">
      <div className='relative w-full sm:w-[600px] md:w-[750px] tb:w-[850px]'>
        <div className='h-full w-full'>
          <img src={whiteboard} className='w-full min-h-[560px]' alt="" />
        </div>
        <div className='handwriting py-9 px-6 sm:px-8 md:px-12 absolute top-0 w-full h-full flex items-center justify-center'>
          {questions && questions.length > 0 &&
            <div className='relative w-full h-full flex flex-col justify-between'>
              {questions.map((question, index) =>
                <React.Fragment key={question._id}>
                  {question.type == 'mcq' && activeTab == '1' && <MCQ question={question} questionNumber={index + 1} disabled={false} />}
                  {question.type == 'match' && activeTab == '2' && <MatchTheColumns question={question} questionNumber={index + 1} disabled={false} />}
                  {question.type == 'fill' && activeTab == '3' && <FillInTheBlanks question={question} questionNumber={index + 1} disabled={false} />}
                </React.Fragment>
              )}

              <div className={`xs:px-10 absolute bottom-14 flex items-center w-full ${activeTab == '1' ? 'justify-end' : 'justify-between'}`}>
                {activeTab > '1' && <button onClick={() => openTab(parseInt(activeTab) - 1)} className='bg-[#fdd341] text-white py-2 px-6 rounded-md shadow-lg z-10 hover:opacity-95 disabled:opacity-80'>Previous</button>}
                {activeTab < questions.length.toString() && <button onClick={() => openTab(parseInt(activeTab) + 1)} className='bg-[#fdd341] text-white py-2 px-6 rounded-md shadow-lg z-10 hover:opacity-95 disabled:opacity-80'>Next</button>}
                {activeTab == questions.length && <ConfirmSubmitModal totalQuestions={totalQuestions} />}
              </div>
            </div>
          }
          {loading &&
            <p className='text-gray-500 text-2xl'>Loading...</p>
          }
          {error &&
            <p className='text-red-500 text-2xl'>Could not get your quiz!</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Quiz
