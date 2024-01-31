import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toasty from '../utils/Toast';
import bgImg from '../assets/images/bgImg.png'

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password != confirmPassword) {
            setMessage("Password and Confirm Password don't match!")
            setTimeout(()=>{
                setMessage('');
            }, [3000])
            return
        }
        try {
            setLoading(true);
            const res = await fetch(`/api/auth/reset-password/${token}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ password }),
                }
            );
            const data = await res.json();
            if (data.success === false) {
                toasty(data.message, "error")
                setLoading(false);
                return;
            }
            setLoading(false);
            toasty("Password reset successfully", "success")
            navigate('/');
        } catch (error) {
            toasty(error.message, "error")
            setLoading(false);
        }
    };

    return (
        <div className="container-full mx-auto flex justify-center items-center h-[100vh] bg-gradient-to-b from-[#4477a6] to-[#91a4b5]">
            <div className='bg-white rounded-lg p-4'>
                <h2 className='text-center font-semibold text-[#4477a6] mb-3 text-xl'>Change Password</h2>
                <form className="w-full flex flex-col justify-center max-w-sm lg:min-w-[350px] mx-auto" onSubmit={handleSubmit}>
                    <input placeholder="Enter New Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`px-3 py-2 mb-3 border border-black rounded-md ${message!='' && 'border-red-500'}`} required />
                    <input placeholder="Confirm New Password" id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={`px-3 py-2 border border-black rounded-md ${message!='' && 'border-red-500'}`} required />
                    <p className='text-red-500 h-3'>{message}</p>
                    <button type="submit" disabled={loading} className="w-full py-2 mt-3 bg-[#fdd341] text-white rounded-md hover:opacity-95 disabled:opacity-80">{loading ? 'Submitting' : 'Submit'}</button>
                </form>
            </div>
            <div>
                <img src={bgImg} alt="" />
            </div>
        </div>
    );
};

export default ResetPassword;
