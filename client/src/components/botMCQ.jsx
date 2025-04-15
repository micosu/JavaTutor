import React, { useState, useEffect, useRef } from "react";

import '../assets/css/tutor.css'
import BotMessage from "./botMessage";
import UserMessage from "./userMessage";
// import TypingLoader from "./typingLoader";

const BotMCQ = ({ messages, isTyping, onSendMessage, onDone }) => {
    const [userInput, setUserInput] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    const handleSend = () => {
        if (userInput.trim()) {
            onSendMessage(userInput); // Pass the user message to the parent component
            setUserInput(""); // Clear the input box
        }
    };

    const lastMessage = messages.length > 0 ? messages[messages.length - 1].text : "";
    const showDoneButton = lastMessage.includes("Press Done to store your progress");
    console.log("showDoneButton", showDoneButton, lastMessage)

    return (
        <div className="botMCQ">
            <p>Tutor</p>
            <div className="bot-mcq-content">
                <div className="chat-area-mcq">
                    {messages.map((msg, index) =>
                        msg.sender === "user" ? (
                            <UserMessage key={index} message={msg.text} />
                        ) : (
                            <BotMessage key={index} message={msg.text} />
                        )
                    )}
                    {/* Scroll anchor */}
                    <div ref={chatEndRef} />
                    {isTyping && <TypingLoader />}
                    {showDoneButton && (
                        <button className="done-button" onClick={onDone}>
                            ✅ Done
                        </button>
                    )}
                </div>
            </div>
            <div className="input-box">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="send-button" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    )
};

const TypingLoader = () => {
    return (
        <div className="typing-loader">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    );
};

export default BotMCQ