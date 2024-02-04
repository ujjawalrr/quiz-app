import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess, neutral } from "../redux/user/userSlice";
import toasty from '../utils/Toast';
import guestImg from '../assets/images/minionGuest.png'

const GuestForm = () => {
    const { loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    // dispatch(neutral());
    const navigate = useNavigate();
    const [guestData, setGuestData] = useState({
        name: '',
        _id: 'guest' + Math.random().toString(36).slice(-8)
    })
    const handleChange = (e) => {
        setGuestData({ ...guestData, [e.target.id]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginStart());
        dispatch(loginSuccess(guestData));
    }
    return (
        <form className="w-full mx-auto" onSubmit={handleSubmit}>
            <img src={guestImg} alt="" className="w-[90%] mx-auto" />
            <div className="flex items-center py-2">
                <label htmlFor="name" className="w-1/4">Name:</label>
                <input placeholder="Enter Your Name" id="name" type="text" onChange={handleChange} className="w-3/4 px-3 py-2 border border-black rounded-md" required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2 mt-2 bg-[#fdd341] text-white rounded-md hover:opacity-95 disabled:opacity-80">{loading ? 'Starting...' : 'Start Quiz'}</button>
        </form>
    );
};

export default GuestForm