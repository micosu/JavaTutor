import React from "react";
import botImage from "../assets/images/bot.svg"
import '../assets/css/tutor.css'
const BotMessage = ({ message }) => {
    return (
        <div className="bot-message">
            <div className="bot-message-image">
                <img src={botImage} alt="bot" />
            </div>
            <div className="bot-message-content">
                <div className="tutorName inter-bold">Debugging Tutor</div>
                <div className="message inter-regular">{message}</div>
            </div>
        </div>
    );
}

export default BotMessage