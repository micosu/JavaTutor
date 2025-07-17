// Login page
import React from 'react';

import '../assets/css/login.css';
import LoginPanel from '../components/loginPanel'

const LoginPage = () => {
    const sessionId = localStorage.getItem("sessionId");
    return (
        <div className="login">
            <LoginPanel />
        </div>
    );
};

export default LoginPage;