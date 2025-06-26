import React, { useState } from "react";
import "../assets/css/tutor.css";

import CodeDisplay from "./codeDisplay";
import Bot from "./bot";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";


const Editor = ({ onRunCode, setBotMessages, setIsTyping, initialCode, problemStatement, initialCorrectAnswers, moduleId, questionId, studentId }) => {
    const [completedCode, setCompletedCode] = useState("");
    const [userInputs, setUserInputs] = useState({}); // User answers from CodeDisplay
    // const [isTyping, setIsTyping] = useState(false); // State for loader
    const [conversationHistory, setConversationHistory] = useState("")
    const [hintCounterFrontend, setHintCounter] = useState(0)
    const sessionId = localStorage.getItem("sessionId");
    const studentGroup = sessionStorage.getItem("studentGroup");
    console.log("studentGroup", studentGroup)
    console.log("Session ID from Editor:", sessionId);
    const handleCodeChange = (fullCode) => {
        setCompletedCode(fullCode);
    };

    // const problemStatement = "Write a Java Program to run a for loop to print the numbers from 1 to 5 in series."
    const code = initialCode;

    const correctAnswers = initialCorrectAnswers;
    console.log("Correct Answers", correctAnswers);
    const handleRun = async () => {
        // To preserve user answer order
        console.log("User Inputs---------", userInputs)
        const orderedKeys = Object.keys(userInputs).sort((a, b) => {
            const [aLine, aPart] = a.split("-").map(Number);
            const [bLine, bPart] = b.split("-").map(Number);
            return aLine === bLine ? aPart - bPart : aLine - bLine;
        });
        // const userAnswers = Object.values(userInputs);
        // const rawUserAnswers = Object.values(userInputs);
        const userAnswers = orderedKeys.map((key) => {
            const answer = userInputs[key];
            return typeof answer === "string" ? answer.trim() : answer;
        });
        // const userAnswers = Object.values(userInputs).map((answer) =>
        //     typeof answer === "string" ? answer.trim() : answer
        // );
        console.log("User Answers:", userAnswers);
        const codeDisplayValidation = document.getElementById("code-display-validation");
        codeDisplayValidation?.click();

        // Validate user answers
        const isCorrect =
            userAnswers.length === correctAnswers.length &&
            userAnswers.every((answer, index) => answer === correctAnswers[index]);

        console.log("Is correct is", isCorrect, correctAnswers, userAnswers)

        await fetch(`${BASE_URL}/api/log-attempt`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sessionId,
                eventType: "attempt",
                timestamp: new Date().toISOString(),
                userAnswers,
                correctAnswers,
                isCorrect,
                moduleId,    // pass this if available in props/context
                questionId,  // pass this if available in props/context
                studentId,
                studentGroup: studentGroup
            }),
        });
        if (onRunCode) {
            onRunCode(completedCode, isCorrect); // Pass the correctness flag
        }

        if (isCorrect) {

        } else {

            // Call ChatGPT API for debugging suggestions
            console.log("Hint Counter in frontend is", hintCounterFrontend)
            setIsTyping(true);
            await callChatGPTAPI(userAnswers, hintCounterFrontend);
            setHintCounter(hintCounterFrontend + 1)
            setIsTyping(false);
        }


    };

    const callChatGPTAPI = async (userAnswers, hintCounterFrontend) => {
        try {
            const response = await fetch(`${BASE_URL}/api/debug`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    templateCode: code,
                    problemStatement: problemStatement,
                    userAnswers,
                    correctAnswers,
                    conversationHistory,
                    hintCounterFrontend
                }), // Pass the user's answers to the backend
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setConversationHistory((prevHistory) => prevHistory + `\nBot: ${data.suggestion}`);
            // Append ChatGPT's debugging suggestion
            setBotMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: `Debugging Suggestion : ${data.suggestion}` },
            ]);
            const newBotMessage = `Debugging Suggestion : ${data.suggestion}`;

            await fetch(`${BASE_URL}/api/log-interaction`, {
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

        } catch (error) {
            setBotMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: `Error fetching debugging details` },
            ]);
            console.log("Error", error)
            await fetch(`${BASE_URL}/api/log-interaction`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    studentId,
                    moduleId,      // make sure you pass these as props/context
                    questionId,
                    eventType: "bot-message",
                    message: `Error fetching debugging details`,
                    timestamp: new Date().toISOString(),
                    studentGroup: studentGroup
                }),
            });
        }
    };

    return (
        <div className="editor">
            <div className="editor-header">
                <p className="inter-bold">Code Editor</p>
                <button onClick={handleRun} className="run-button inter-bold">
                    Run
                </button>
            </div>
            <div className="code">
                <CodeDisplay
                    codeString={code}
                    onCodeChange={handleCodeChange}
                    correctAnswers={correctAnswers}
                    onInputsChange={setUserInputs}
                />
            </div>
            <p>If you're confident your answer is correct but it's marked wrong, try refreshing the page and submitting again. Also inform your professor about the Module ID and Question ID when this happens.</p>
            {/* <Bot isTyping={isTyping} /> */}

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


export default Editor;
