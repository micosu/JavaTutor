import React from 'react';

import '../assets/css/login.css';
import LoginPanel from '../components/loginPanel'
const LoginPage = ({ title, onClick }) => {
    return (
        <div className="login">
            <LoginPanel />
            {/* <button onClick={onClick}>Click Me</button> */}

        </div>
    );
};

export default LoginPage;