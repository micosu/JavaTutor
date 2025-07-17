// This is the login panel for the tutor and handles login
import React, { useState } from 'react'
import '../assets/css/login.css'
import users from '../assets/images/users.svg'
import { useNavigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

const LoginPanel = () => {
    const sessionId = localStorage.getItem("sessionId");
    const [rollNumber, setRollNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleBegin = async () => {
        if (!rollNumber.trim()) {
            setError('Please enter a Unique ID');
            return;
        }
        try {
            // Login API call
            const response = await fetch(`${BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rollNumber }),
            });

            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem('studentId', data.user._id);
                sessionStorage.setItem('studentGroup', data.user.type);
               
                if (data.user.type == "test") {
                    navigate(`/home?studentId=${data.user._id}`);
                }
                else if (data.user.type == "control") {
                    navigate(`/dashboard?studentId=${data.user._id}`);
                }

            } else {
                setError(data.message || 'Invalid Unique ID');
            }
        } catch (error) {
            setError('Server error. Please try again later.');
            console.error('Login error:', error);
        }
    };

    return (
        <div className='loginPanel'>
            <img className="userImage" src={users} alt="" />
            <h3>Login</h3>
            <label htmlFor="rollNumber">Unique ID</label>
            <input
                type="text"
                name="rollNumber"
                id="rollNumber"
                className="rollNumber"
                value={rollNumber} onChange={(e) => setRollNumber(e.target.value)}
                placeholder='John2805' />
            {error && <p className="error">{error}</p>}
            <button className='submit' onClick={handleBegin}>Begin</button>
        </div>
    )
}

export default LoginPanel
