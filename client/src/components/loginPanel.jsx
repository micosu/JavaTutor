import React from 'react'
import '../assets/css/login.css'
import users from '../assets/images/users.svg'
import { useNavigate } from 'react-router-dom';
const LoginPanel = () => {

    const navigate = useNavigate();

    const handleBegin = () => {
        navigate('/home'); // Replace '/home' with your target path
    };

    return (
        <div className='loginPanel'>
            <img className="userImage" src={users} alt="" />
            <h3>Login</h3>
            <label htmlFor="rollNumber">Unique ID</label>
            <input type="text" name="rollNumber" id="rollNumber" className="rollNumber" placeholder='John2805' />
            <button className='submit' onClick={handleBegin}>Begin</button>
        </div>
    )
}

export default LoginPanel
