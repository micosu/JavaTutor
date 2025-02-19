import React from "react";
import "../assets/css/tutor.css";

const UserMessage = ({ message }) => {
    return (
        <div className="user-message">
            <div className="user-message-content">
                <div className="tutorName inter-bold">You</div>
                <div className="message inter-regular">{message}</div>
            </div>
        </div>
    );
};

export default UserMessage;
