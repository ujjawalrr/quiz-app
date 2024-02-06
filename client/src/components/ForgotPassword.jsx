import React, { useEffect, useState } from 'react';
import toasty from '../utils/Toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = ({ userEmail }) => {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setEmail(userEmail)
    }, [userEmail]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email) === false) {
            setMessage('Enter valid email!');
            setTimeout(() => {
                setMessage('')
            }, [3000])
            return
        }
        try {
            setLoading(true);
            const res = await fetch(`/api/auth/forgot-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                }
            );
            const data = await res.json();
            if (data.success === false) {
                toasty(data.message, "error")
                setLoading(false);
                return;
            }
            setLoading(false);
            toasty('Password reset email sent. Please check your email.', "success")
            navigate('/');
        } catch (error) {
            toasty(error.message, "error")
            setLoading(false);
        }
    };

    return (
        <div>
            <button type='button' className="w-full font-semibold text-[#4477a6]" onClick={handleShow}>Forgot Password?</button>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                    <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={handleClose}></div>
                    <div className="bg-white rounded-lg z-50">
                        <div className="flex justify-between items-center border-b p-3">
                            <h3 className="text-xl font-semibold">Forgot Password?</h3>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.293 6.707a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-3">
                            <p className='text-gray-700'>Get a link on your registered email to reset your password</p>
                            <div className="py-2 mt-2">
                                <input placeholder="Enter Your Registered Email" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-3 py-2 border border-black rounded-md ${message!='' && 'border-red-500'}`} required />
                                <p className='text-red-500 h-3'>{message}</p>
                            </div>
                            <button disabled={loading} onClick={handleSubmit} type="button" className="w-full mt-2 py-2 bg-[#2a5387] text-white rounded-md hover:opacity-95 disabled:opacity-80">{loading ? 'Submitting' : 'Submit'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword