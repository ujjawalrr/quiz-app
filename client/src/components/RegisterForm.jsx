import { useState } from "react";
import OAuth from "./OAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess, neutral } from "../redux/user/userSlice";
import toasty from '../utils/Toast';

const RegisterForm = () => {
    const { loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    // dispatch(neutral());
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
            e.preventDefault();
        try {
            dispatch(loginStart());
            const res = await fetch('/api/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(registerData),
                }
            );
            const data = await res.json();
            if (data.success === false) {
                toasty(data.message, "error")
                dispatch(loginFailure(data.message));
                return;
            }
            toasty("Registered Successfully!", "success")
            dispatch(loginSuccess(data));
            navigate('/quiz');
        } catch (error) {
            toasty(error.message, "error")
            dispatch(loginFailure(error.message));
        }
    }
    return (
        <form className="w-full mx-auto" onSubmit={handleSubmit}>
            <div className="flex items-center py-2">
                <label htmlFor="name" className="w-1/4">Name:</label>
                <input placeholder="Enter Your Name" id="name" type="text" onChange={handleChange} className="w-3/4 px-3 py-2 border border-black rounded-md" required />
            </div>
            <div className="flex items-center py-2">
                <label htmlFor="email" className="w-1/4">Email:</label>
                <input placeholder="Enter Your Email" id="email" type="email" onChange={handleChange} className="w-3/4 px-3 py-2 border border-black rounded-md" required />
            </div>
            <div className="flex items-center py-2">
                <label htmlFor="password" className="w-1/4">Password:</label>
                <input placeholder="Enter Your Password" id="password" type="password" onChange={handleChange} className="w-3/4 px-3 py-2 border border-black rounded-md" required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 my-2 bg-[#fdd341] text-white rounded-md hover:opacity-95 disabled:opacity-80">{loading ? 'Registering' : 'Register'}</button>
            <OAuth />
        </form>
    );
};

export default RegisterForm