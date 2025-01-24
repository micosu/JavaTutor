import React from 'react'
import '../assets/css/tutor.css'
import users from '../assets/images/users.svg'
import { useNavigate } from 'react-router-dom';

const Header = ({ topic, problem } ) => {

    const navigate = useNavigate();
    return (
        <div className='header'>
            <div class="logo"></div>
            <div><p>{topic}</p></div>
            <div class="line"></div>
            <div><p>{problem}</p></div>
        </div>
    )
}

export default Header