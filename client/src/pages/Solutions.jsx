import React from 'react'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MCQ from "../components/MCQ";
import FillInTheBlanks from "../components/FillInTheBlanks";
import MatchTheColumns from "../components/MatchTheColumns";

const Solutions = () => {
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
    console.log(solutions)
    console.log(checkedQuestions);
    return (
        <div className='container-fluid'>
            <div className="mx-auto py-5 w-full sm:w-[600px] md:w-[750px] tb:w-[850px]">
                <h2 className="text-center text-3xl mb-4">
                    Solutions
                </h2>
                <div className="flex flex-col gap-8">
                {solutions && solutions.length > 0 && solutions.map((question, index) =>
                    <React.Fragment key={question._id}>
                        {question.type == 'mcq' && <MCQ question={question} questionNumber={index + 1} />}
                        {question.type == 'match' && <MatchTheColumns question={question} questionNumber={index + 1} />}
                        {question.type == 'fill' && <FillInTheBlanks question={question} questionNumber={index + 1} />}
                    </React.Fragment>
                )}
                </div>
            </div>
        </div>
    )
}

export default Solutions
