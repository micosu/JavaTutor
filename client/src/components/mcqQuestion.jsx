import React, { useState } from "react";
import "../assets/css/tutor.css"; // Ensure this CSS file exists

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

const MCQOptions = ({ options, correctAnswers, question, onReceiveFeedback, setIsTyping }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [conversationHistory, setConversationHistory] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setIsCorrect(null); // Reset correctness when a new option is selected
        setFeedback("");
    };

    const handleCheckAnswer = async () => {
        if (selectedOption !== null) {

            const correctAnswersArray = Array.isArray(correctAnswers) ? correctAnswers : [correctAnswers]; // Ensure it's always an array

            console.log("Selected Option (trimmed):", selectedOption.trim());
            // console.log("Correct Answers (trimmed):", correctAnswers.map(answer => answer.trim()));
            console.log("correctAnswers:", correctAnswers);
            console.log("Type of correctAnswers:", typeof correctAnswers);

            const correct = correctAnswersArray.some(answer => String(answer).trim() === String(selectedOption).trim());

            console.log("Frontend Correct Check:", correct); // Debugging

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

                    if (!correct) {
                        setFeedback(data.feedback);
                        if (onReceiveFeedback) {
                            onReceiveFeedback(data.feedback, "bot");
                        }
                        setConversationHistory((prev) => prev + "\n" + data.feedback);
                    }

                } catch (error) {
                    setFeedback("Error: Unable to get feedback. Try again.");
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
                            style={{ pointerEvents: "none" }}
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
