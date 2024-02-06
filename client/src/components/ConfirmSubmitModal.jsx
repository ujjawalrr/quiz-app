import React, { useEffect, useState } from 'react';
import toasty from '../utils/Toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateAttemptedQuestions, updateCheckedQuestions } from '../redux/question/questionSlice';

const ConfirmSubmitModal = ({ totalQuestions }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user)
    const { attemptedQuestions } = useSelector(state => state.question)
    const [attemptedQuestionsState, setAttemptedQuestionsState] = useState(attemptedQuestions);
    const [countSolved, setCountSolved] = useState(0);
    const [evaluating, setEvaluating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        let attemptedQuestionsObj = {};
        let count = 0;
        Object.entries(attemptedQuestions).forEach(([key, value]) => {
            if (value != '') {
                count++;
                attemptedQuestionsObj[key] = value;
            }
        });
        setAttemptedQuestionsState(attemptedQuestionsObj);
        setCountSolved(count);
        setShowModal(true);
    };
    useEffect(() => {
        dispatch(updateAttemptedQuestions(attemptedQuestionsState));
    }, [attemptedQuestionsState])

    const checkSolution = async (questionId, subQuestionId, markedAns) => {
        console.log("in check sol", questionId, subQuestionId, markedAns)
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
    const calculateData = (checkedQuestionsObj)=>{
        let marks = 0;
        let correctQuestions = 0;
        let incorrectQuestions = 0;
        Object.entries(checkedQuestionsObj).forEach(([key, value]) => {
            if(value.marks != undefined){
                marks += parseInt(value.marks);
            }
            if(value.status == true){
                correctQuestions++;
            }
            if(value.status == false){
                incorrectQuestions++;
            }
        });
        return {marks, correctQuestions, incorrectQuestions};
    }
    const storeCheckedQuestions = async (checkedQuestionsObj) => {
        try {
            let {marks, correctQuestions, incorrectQuestions} =  calculateData(checkedQuestionsObj);
            const response = await fetch('/api/performer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        userId: currentUser._id,
                        name: currentUser.name,
                        evaluatedQuestions: checkedQuestionsObj,
                        marks, correctQuestions, incorrectQuestions, totalQuestions
                    }
                ),
            });

            if (!response.ok) {
                toasty('Failed to store checked questions', 'error');
            }

            const data = await response.json();
            dispatch(updateCheckedQuestions(data));
            dispatch(updateAttemptedQuestions({}));
            setEvaluating(false);
            navigate('/dashboard');
        } catch (error) {
            toasty('Error storing checked questions', 'error');
            setEvaluating(false);
        }
    };

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
                        status: checkSol.status,
                        markedAns: value,
                        questionId: parts[0],
                        subQuestionId: subQuestionId,
                        marks: checkSol.marks
                    };
                }
            }));
            await storeCheckedQuestions(checkedQuestionsObj);
        } catch (error) {
            setEvaluating(false);
            console.error("Error occurred while checking solutions: ", error);
        }
    }
console.log(attemptedQuestions)
    return (
        <div className=''>
            <button onClick={handleShow} className='bg-red-800 text-white py-2 px-3 sm:px-6 rounded-md shadow-lg z-10 hover:opacity-95 disabled:opacity-80'>Submit Quiz</button>
            {showModal && (
                <div className="font-sans fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
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
                            <p className=''>
                                You have attempted {countSolved}/{totalQuestions} questions.
                            </p>
                            <div className="py-2 mt-2">
                                Once submitted, you won't be able to edit your answers.
                            </div>
                            <div className='flex justify-between align-items-center'>
                                <button disabled={evaluating} onClick={handleClose} className="mt-2 py-2 px-4 bg-red-500 text-white rounded-md hover:opacity-95 disabled:opacity-80">Cancel</button>
                                <button disabled={evaluating} onClick={handleSubmit} className="mt-2 py-2 px-4 bg-red-900 text-white rounded-md hover:opacity-95 disabled:opacity-80">{evaluating ? 'Submitting' : 'Submit'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfirmSubmitModal