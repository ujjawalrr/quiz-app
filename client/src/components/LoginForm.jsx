import { useState } from "react";
import OAuth from "./OAuth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { neutral, loginFailure, loginStart, loginSuccess } from "../redux/user/userSlice";
import toasty from '../utils/Toast';
import ForgotPassword from "./ForgotPassword";

const LoginForm = () => {
    const { loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    // dispatch(neutral());
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
            e.preventDefault();
        try {
            dispatch(loginStart());
            const res = await fetch('/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                }
            );
            const data = await res.json();
            if (data.success === false) {
                toasty(data.message, "error")
                dispatch(loginFailure(data.message));
                return;
            }
            toasty("Login Successful!", "success")
            dispatch(loginSuccess(data));
            navigate('/quiz');
        } catch (error) {
            toasty(error.message, "error")
            dispatch(loginFailure(error.message));
        }
    }
    return (
        <form className="w-full flex flex-col justify-center mx-auto" onSubmit={handleSubmit}>
            <div className="flex items-center py-3">
                <label htmlFor="email" className="w-1/4">Email:</label>
                <input placeholder="Enter Your Email" id="email" type="email" onChange={handleChange} className="w-3/4 px-3 py-2 border border-black rounded-md" required />
            </div>
            <div className="flex items-center py-3">
                <label htmlFor="password" className="w-1/4">Password:</label>
                <input placeholder="Enter Your Password" id="password" type="password" onChange={handleChange} className="w-3/4 px-3 py-2 border border-black rounded-md" required />
            </div>
            <div className="flex items-center py-2">
                <ForgotPassword userEmail={loginData.email} />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 my-2 bg-red-500 text-white rounded-md hover:opacity-95 disabled:opacity-80">{loading ? 'Logging in...' : 'Login'}</button>
            <OAuth />
        </form>
    );
};

export default LoginForm