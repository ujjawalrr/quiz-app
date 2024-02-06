import React from 'react'
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logoutFailure, logoutStart, logoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        dispatch(logoutStart());
        try {
            const res = await fetch(`/api/auth/logout`);
            const data = await res.json();
            if (data.success === false) {
                dispatch(logoutFailure(data.message));
                return;
            }
            dispatch(logoutSuccess(data));
        } catch (error) {
            dispatch(logoutFailure(error.message));
        }
    }
    const handleLogin = () => {
        navigate('/');
    }
    return (
        <div className="flex px-5 text-white justify-between items-center h-[60px] bg-gradient-to-r from-[#d16d2c] to-[#7f340a]">
            <h1 className="text-2xl font-semibold">
                Quizify
            </h1>

            {currentUser ?
                <div className='flex gap-4'>
                    <div className="flex items-center">
                        <FaUser className="mr-2" />
                        <span>{currentUser.name}</span>
                    </div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                :
                <button onClick={handleLogin}>
                    Login
                </button>
            }
        </div>
    )
}

export default Header
