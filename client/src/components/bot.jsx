import React from "react";
import '../assets/css/tutor.css'
import BotMessage from "./botMessage";

const Bot = () => {
    return (
        <div className="bot">
            <p className="inter-bold bot-title">Tutor</p>
            <div className="bot-content">
                <BotMessage message="Hi! Welcome to the Java Course. Start coding on the right. If you run into any errors, just ask. If the output is wrong, I will try my best to guide you." />
                <div className="sendMessage">
                    <input type="text" placeholder="Type your message..." />
                    <button className="send-button">Send</button>
                </div>
            </div>

        </div>
    )
}

export default Bot