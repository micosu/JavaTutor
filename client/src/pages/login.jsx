import React from 'react';

import '../assets/css/login.css';
import LoginPanel from '../components/loginPanel'
const LoginPage = ({ title, onClick }) => {
    const sessionId = localStorage.getItem("sessionId");
    console.log("Session ID:", sessionId);
    return (
        <div className="login">
            <LoginPanel/>
            {/* x<button onClick={onClick}>Click Me</button> */}

        </div>
    );
};

export default LoginPage;