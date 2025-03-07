import React, { useState } from 'react'
import '../assets/css/login.css'
import users from '../assets/images/users.svg'
import { useNavigate } from 'react-router-dom';
const LoginPanel = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleBegin = async () => {
        if (!rollNumber.trim()) {
            setError('Please enter a Unique ID');
            return;
        }
        try {
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rollNumber }),
            });

            const data = await response.json();
            console.log("Data from login - ", data)
            if (response.ok) {
                sessionStorage.setItem('studentId', data.user._id);
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
