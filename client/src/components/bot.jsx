import React, { useState, useRef, useEffect } from "react";
import '../assets/css/tutor.css'
import BotMessage from "./botMessage";
import UserMessage from "./userMessage";

const Bot = ({ messages, isTyping, onSendMessage, onDone }) => {
    const [userInput, setUserInput] = useState("");
    const safeMessages = Array.isArray(messages) ? messages : [];
    console.log("messages", messages)
    const chatEndRef = useRef(null);

    // Scroll to the last message when `messages` updates
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        if (userInput.trim()) {
            onSendMessage(userInput); // Pass the user message to the parent component
            setUserInput(""); // Clear the input box
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !isTyping) {
            handleSend();
        }
    };

    const lastMessage = messages.length > 0 ? messages[messages.length - 1].text : "";
    const showDoneButton = lastMessage.includes("Press Done to store your progress.");
    return (
        <div className="bot">
            <p className="inter-bold bot-title">Tutor</p>
            <div className="bot-content">
                <div className="chat-area">
                    {messages.map((msg, index) =>
                        msg.sender === "user" ? (
                            <UserMessage key={index} message={msg.text} />
                        ) : (
                            <BotMessage key={index} message={msg.text} />
                        )
                    )}
                    {/* Scroll anchor */}
                    <div ref={chatEndRef} />
                    {isTyping && <TypingLoader />} {/* Show loader while waiting for ChatGPT */}

                    {showDoneButton && (
                        <button className="done-button" onClick={onDone}>
                            ✅ Done
                        </button>
                    )}
                </div>

                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="send-button" onClick={handleSend} disabled={isTyping || userInput.trim() === ""}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
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

export default Bot