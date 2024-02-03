import React, { useEffect, useState } from 'react';
import toasty from '../utils/Toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateAttemptedQuestions, updateCheckedQuestions } from '../redux/question/questionSlice';

const ConfirmSubmitModal = ({ totalQuestions }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { attemptedQuestions, checkedQuestions } = useSelector(state => state.question)
    const [countSolved, setCountSolved] = useState(0);
    const [evaluating, setEvaluating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        let attemptedQuestionsObj = {};
        Object.entries(attemptedQuestions).forEach(([key, value]) => {
            if (value != '') {
                attemptedQuestionsObj[key] = value;
            }
        });
        dispatch(updateAttemptedQuestions(attemptedQuestionsObj));
        setCountSolved(Object.keys(attemptedQuestionsObj).length);
        console.log(attemptedQuestions, "attempted question");
        setShowModal(true);
    };

    const checkSolution = async (questionId, subQuestionId, markedAns) => {
        try {
            const res = await fetch('/api/question/evaluate',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ questionId, subQuestionId, markedAns }),
                }
            );
            const data = await res.json();
            if (data.success === false) {
                console.log("Can't evaluate: ", subQuestionId);
                return -1;
            }
            return data;
        } catch (error) {
            console.log("Error: Can't evaluate: ", subQuestionId);
            return -1;
        }
    }

    const handleSubmit = async () => {
        setEvaluating(true);
        let checkedQuestionsObj = {};
        try {
            await Promise.all(Object.entries(attemptedQuestions).map(async ([key, value]) => {
                const parts = key.split('_');
                let subQuestionId = parts[1];
                if (value !== '') {
                    let checkSol = await checkSolution(parts[0], parts[1], value);
                    checkedQuestionsObj[subQuestionId] = {
                        status: checkSol,
                        markedAns: value,
                        questionId: parts[0],
                        subQuestionId: subQuestionId
                    };
                }
            }));
            dispatch(updateCheckedQuestions(checkedQuestionsObj));
            dispatch(updateAttemptedQuestions('false'));
        } catch (error) {
            console.error("Error occurred while checking solutions: ", error);
        }
        setEvaluating(false);
        navigate('/dashboard');
    }

    return (
        <div>
            <button onClick={handleShow} className='bg-red-500 text-white py-2 px-6 rounded-md shadow-lg z-10 hover:opacity-95 disabled:opacity-80'>Submit Quiz</button>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                    <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={handleClose}></div>
                    <div className="bg-white rounded-lg z-50">
                        <div className="flex justify-between items-center border-b p-3">
                            <h3 className="text-xl font-semibold">Submit Quiz?</h3>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.293 6.707a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-3">
                            <p className='text-gray-700'>
                                You have attempted {Object.keys(attemptedQuestions).length}/{totalQuestions} questions.
                            </p>
                            <div className="py-2 mt-2">
                                You have attempted {Object.keys(attemptedQuestions).length}/{totalQuestions} questions.
                            </div>
                            <div className='flex justify-between align-items-center'>
                                <button disabled={evaluating} onClick={handleClose} className="mt-2 py-2 px-4 bg-[#4477a6] text-white rounded-md hover:opacity-95 disabled:opacity-80">Cancel</button>
                                <button disabled={evaluating} onClick={handleSubmit} className="mt-2 py-2 px-4 bg-red-500 text-white rounded-md hover:opacity-95 disabled:opacity-80">{evaluating ? 'Submitting' : 'Submit'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfirmSubmitModal