// This is the header that shows the topic and module and the problem number
import React from 'react'
import '../assets/css/tutor.css'
import users from '../assets/images/users.svg'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/Logo.svg'

const Header = ({ topic, problem }) => {
    return (
        <div className='header'>
            <div><img className="logo" src={logo} alt="" /></div>
            <div><p>{topic}</p></div>
            <div className="line"></div>
            <div><p>{problem}</p></div>
        </div>
    )
}

export default Header