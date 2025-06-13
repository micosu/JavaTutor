import React, { useState } from "react";
import "../assets/css/tutor.css"; // Ensure this CSS file exists

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

const MCQOptions = ({ options, correctAnswers, question, onReceiveFeedback, setIsTyping, studentId, moduleId, questionId }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [conversationHistory, setConversationHistory] = useState("");
    const studentGroup = sessionStorage.getItem("studentGroup");
    const handleOptionChange = (event) => {
        const option = event.target.value;
        setSelectedOption(option);
        setIsCorrect(null);
        setFeedback("");

        const sessionId = localStorage.getItem("sessionId");
        const timestamp = new Date().toISOString();
        const correctAnswersArray = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers];
        const correct = correctAnswersArray.some(answer => String(answer).trim() === String(option).trim());

        fetch(`${BASE_URL}/log-attempt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId,
                studentId,
                moduleId,
                questionId,
                eventType: "mcq-try",
                message: option,
                timestamp,
                userAnswers: option,
                correctAnswers,
                isCorrect: correct,
                studentGroup,
            }),
        });
    };

    const handleCheckAnswer = async () => {

        if (selectedOption !== null) {
            const sessionId = localStorage.getItem("sessionId");
            const timestamp = new Date().toISOString();

            const correctAnswersArray = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers]; // Ensure it's always an array

            console.log("Selected Option (trimmed):", selectedOption.trim());
            // console.log("Correct Answers (trimmed):", correctAnswers.map(answer => answer.trim()));
            console.log("correctAnswers:", correctAnswers);
            console.log("Type of correctAnswers:", typeof correctAnswers);

            const correct = correctAnswersArray.some(answer => String(answer).trim() === String(selectedOption).trim());

            console.log("Frontend Correct Check:", correct); // Debugging
            fetch(`${BASE_URL}/log-attempt`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: sessionId,
                    studentId: studentId,
                    moduleId: moduleId, // or pass via props
                    questionId: questionId,
                    eventType: "mcq-submit",
                    userAnswers: selectedOption,
                    correctAnswers: correctAnswers,
                    isCorrect: correct,
                    timestamp: timestamp,
                    studentGroup: studentGroup
                }),
            });
            setIsCorrect(correct);

            if (correct) {
                console.log("✅ Answer is correct on frontend");
                const successMessage = "🎉 Congratulations! You got the right answer! Press Done to store your progress";
                setFeedback(successMessage);
                setConversationHistory(""); // Reset conversation on correct answer

                if (onReceiveFeedback) {
                    onReceiveFeedback(successMessage, "bot"); // Send to chatbot
                }
            } else {
                console.log("❌ Answer is incorrect on frontend. Fetching feedback...");
                if (setIsTyping) setIsTyping(true);
                try {
                    const wrongAnswerMessage = "❌ Your answer is wrong. Let me help you.";
                    setFeedback(wrongAnswerMessage);
                    if (onReceiveFeedback) {
                        onReceiveFeedback(wrongAnswerMessage, "bot");
                    }

                    await new Promise(resolve => setTimeout(resolve, 800));

                    console.log("Fetching feedback from bot for incorrect answer...");

                    const response = await fetch(`${BASE_URL}/api/mcq-feedback`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            problemStatement: question.problemStatement,
                            options: options,
                            userAnswer: selectedOption,
                            correctAnswers: correctAnswers,
                            conversationHistory: conversationHistory, // Optional: Pass past interactions
                        }),
                    });

                    const data = await response.json();

                    console.log("Bot response:", data);

                    const newBotMessage = `Debugging Suggestion : ${data.feedback}`;

                    await fetch(`${BASE_URL}/log-interaction`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            sessionId,
                            studentId,
                            moduleId,      // make sure you pass these as props/context
                            questionId,
                            eventType: "bot-message",
                            message: newBotMessage,
                            timestamp: new Date().toISOString(),
                            studentGroup: studentGroup
                        }),
                    });


                    if (!correct) {
                        setFeedback(data.feedback);
                        if (onReceiveFeedback) {
                            onReceiveFeedback(data.feedback, "bot");
                        }
                        setConversationHistory((prev) => prev + "\n" + data.feedback);
                    }

                } catch (error) {
                    setFeedback("Error: Unable to get feedback. Try again.");
                    await fetch(`${BASE_URL}/log-interaction`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            sessionId,
                            studentId,
                            moduleId,      // make sure you pass these as props/context
                            questionId,
                            eventType: "bot-message",
                            message: "Error: Unable to get feedback. Try again.",
                            timestamp: new Date().toISOString(),
                            studentGroup: studentGroup
                        }),
                    });
                } finally {
                    if (setIsTyping) setIsTyping(false); // Hide typing indicator after response
                }
            }

        }
    };
    return (
        <div className="mcqOptions">
            <p className="mcqTitle">
                Choose one of the following and press <span className="bold">Done</span> to check your answer.
            </p>
            <div className="mcqOptionsList">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`optionItem ${isCorrect !== null && selectedOption === option
                            ? isCorrect
                                ? "correct"
                                : "incorrect"
                            : ""
                            }`}

                        onClick={() => {
                            setSelectedOption(option);
                            setIsCorrect(null);
                            setFeedback("");
                            const sessionId = localStorage.getItem("sessionId");
                            const timestamp = new Date().toISOString();
                            const correctAnswersArray = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers];
                            const correct = correctAnswersArray.some(answer => String(answer).trim() === String(option).trim());

                            fetch(`${BASE_URL}/log-attempt`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    sessionId,
                                    studentId,
                                    moduleId,
                                    questionId,
                                    eventType: "mcq-try",
                                    message: option,
                                    timestamp,
                                    userAnswers: option,
                                    correctAnswers,
                                    isCorrect: correct,
                                    studentGroup,
                                }),
                            });
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <input
                            type="radio"
                            name="java"
                            id={`option-${index}`}
                            className="radioButton"
                            value={option}
                            // onChange={handleOptionChange}
                            onChange={() => { }}
                            checked={selectedOption === option}
                        // style={{ pointerEvents: "none" }}
                        />
                        <label htmlFor={`option-${index}`} className="optionLabel">
                            {option}
                        </label>
                    </div>
                ))}
            </div>
            <div>
                <button className="doneButton" onClick={handleCheckAnswer}>
                    Done
                </button>
            </div>
        </div>
    );
};

export default MCQOptions;
