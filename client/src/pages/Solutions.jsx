import React from 'react'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MCQ from "../components/MCQ";
import FillInTheBlanks from "../components/FillInTheBlanks";
import MatchTheColumns from "../components/MatchTheColumns";
import { FaUser } from 'react-icons/fa';

const Solutions = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { attemptedQuestions, checkedQuestions } = useSelector(state => state.question)
    const [solutions, setSolutions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const loadSolutions = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/question?includeCorrectAns=true`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setLoading(false);
                setError(false);
                setSolutions(data);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }
        loadSolutions();
    }, []);
    return (
        <div className='container-fluid'>
            <div className="flex bg-gradient-to-r from-yellow-400 to-yellow-600 items-center p-3">
                <h1 className="text-2xl font-semibold text-white ml-6 mr-4">
                    Dashboard
                </h1>
                <div className="ml-auto mr-4">
                    <div className="flex items-center">
                        <FaUser className="text-white mr-2" />
                        <span className="text-white">{currentUser.name}</span>
                    </div>
                </div>
            </div>
            {checkedQuestions && checkedQuestions != undefined &&
                <div className="mx-auto py-5 w-full sm:w-[600px] md:w-[750px] tb:w-[800px]">
                    <h2 className="text-center text-3xl mb-4">
                        Solutions
                    </h2>
                    <div className="flex flex-col gap-8">
                        {solutions && solutions.length > 0 && solutions.map((question, index) =>
                            <div className='bg-slate-100 p-3 shadow-md rounded lg' key={question._id}>
                                {question.type == 'mcq' && <MCQ question={question} questionNumber={index + 1} disabled={true} />}
                                {question.type == 'match' && <MatchTheColumns question={question} questionNumber={index + 1} disabled={true} />}
                                {question.type == 'fill' && <FillInTheBlanks question={question} questionNumber={index + 1} disabled={true} />}
                            </div>
                        )}
                        {loading &&
                            <p className='text-gray-500 flex justify-center align-items-center text-2xl'>Loading...</p>
                        }
                        {error &&
                            <p className='text-red-500 text-2xl'>Could not get your quiz!</p>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Solutions
