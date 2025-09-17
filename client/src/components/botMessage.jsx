// This file is the component for the bot message. Every time the bot sends the message, we pass the message to this component and render it on screen.

// Importing the required dependencies
import React from "react";
import botImage from "../assets/images/bot.svg"
import ReactMarkdown from 'react-markdown';
import '../assets/css/tutor.css'

// Props - message returned by the API
const BotMessage = ({ message }) => {
    return (
        <div className="bot-message">
            <div className="bot-message-image">
                <img src={botImage} alt="bot" />
            </div>
            <div className="bot-message-content">
                <div className="tutorName inter-bold">Debugging Tutor</div>
                <div className="message inter-regular">
                    <ReactMarkdown>{message}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default BotMessage