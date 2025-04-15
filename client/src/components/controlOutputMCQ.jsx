import React, { useState, useEffect, useRef } from "react";
import '../assets/css/tutor.css'
import BotMessage from "./botMessage";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

const ControlOutputMCQ = ({ CorrectAnswers, studentId, moduleId, questionId, feedbackMessage }) => {
    const [revealed, setRevealed] = useState(false);
    const chatEndRef = useRef(null);


    useEffect(() => {
        if (revealed || feedbackMessage) {
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [revealed, feedbackMessage]); // Auto-scroll on feedback update


    const handleClick = async () => {
        setRevealed(true);

        try {
            const response = await fetch(`${BASE_URL}/api/reveal-answer"`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ studentId, moduleId, questionId }),
            });

            const data = await response.json();
            console.log("Reveal answer recorded:", data);
        } catch (error) {
            console.error("Error sending reveal answer data:", error);
        }
    }
    return (
        <div className="botMCQ">
            <p className="inter-bold bot-title">Feedback</p>
            <div className="bot-mcq-content">
                <div className="chat-area-mcq">
                    <BotMessage message={"Welcome to the Java Tutor! Try entering the answers to the right and once done press the run button to run the code and verify your answers. If at any moment, you feel stuck, just press the reveal answers button below to get the answers"} />
                    <button className="inter-bold reveal" onClick={handleClick}>Reveal Answers</button>

                    {/* Display feedback message dynamically */}

                    {revealed && (
                        <BotMessage
                            message={`Correct Answers: ${Array.isArray(CorrectAnswers)
                                ? CorrectAnswers.join(", ")
                                : CorrectAnswers || "No answers available"
                                }`}
                        />

                    )}
                    {feedbackMessage && <BotMessage message={feedbackMessage} />}
                    <div ref={chatEndRef} />
                </div>
            </div>

        </div>
    )
};

export default ControlOutputMCQ