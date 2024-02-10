import React, { useEffect, useState } from 'react';
import toasty from '../utils/Toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateAttemptedQuestions, updateCheckedQuestions } from '../redux/question/questionSlice';
import { logoutFailure, logoutStart, logoutSuccess } from '../redux/user/userSlice';

const ConfirmCancelModal = () => {
    const { loading } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleLogout = async () => {
        dispatch(logoutStart());
        try {
          const res = await fetch(`/api/auth/logout`);
          const data = await res.json();
          if (data.success === false) {
            dispatch(logoutFailure(data.message));
            return;
          }
          dispatch(logoutSuccess());
          dispatch(updateAttemptedQuestions({}));
        } catch (error) {
          dispatch(logoutFailure(error.message));
        }
      }
    return (
        <div className=''>
            <button onClick={handleShow} className='bg-red-800 text-white py-2 px-3 sm:px-6 rounded-md shadow-lg z-10 hover:opacity-95 disabled:opacity-80'>Cancel Quiz</button>
            {showModal && (
                <div className="font-sans fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                    <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={handleClose}></div>
                    <div className="bg-white rounded-lg z-50">
                        <div className="flex justify-between items-center border-b p-3">
                            <h3 className="text-xl font-semibold">Cancel Quiz?</h3>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.293 6.707a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-3">
                            <p className=''>
                                Are you sure you want to cancel this quiz?
                            </p>
                            <div className="py-2">
                                All the attempted questions will be lost.
                            </div>
                            <div className='flex justify-between align-items-center'>
                                <button onClick={handleClose} className="mt-2 py-2 px-4 bg-[#7f340a] text-white rounded-md hover:opacity-95 disabled:opacity-80">No</button>
                                <button disabled={loading} onClick={handleLogout} className="mt-2 py-2 px-4 bg-red-600 text-white rounded-md hover:opacity-95 disabled:opacity-80">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConfirmCancelModal