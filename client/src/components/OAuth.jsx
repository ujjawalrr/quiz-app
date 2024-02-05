import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom'
import toasty from '../utils/Toast';

const OAuth = () => {
    const { loading } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            dispatch(loginStart());
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email }),
            })
            const data = await res.json();
            dispatch(loginSuccess(data));
            navigate('/quiz');
        } catch (error) {
            dispatch(loginFailure(error));
            toasty("Could not sign in with Google", "error")
        }
    }
    return (
        <button onClick={handleGoogleClick} type='button' disabled={loading} className="w-full py-2 bg-[#2a5387] text-white rounded-md hover:opacity-95 disabled:opacity-80">Continue with Google</button>
    )
}

export default OAuth
