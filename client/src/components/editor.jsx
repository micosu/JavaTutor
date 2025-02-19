import React, { useState } from "react";
import "../assets/css/tutor.css";

import CodeDisplay from "./codeDisplay";
import Bot from "./bot";

const Editor = ({ onRunCode, setBotMessages, setIsTyping }) => {
    const [completedCode, setCompletedCode] = useState("");
    const [userInputs, setUserInputs] = useState({}); // User answers from CodeDisplay
    // const [isTyping, setIsTyping] = useState(false); // State for loader


    const handleCodeChange = (fullCode) => {
        setCompletedCode(fullCode);
    };

    const problemStatement = "Write a Java Program to run a for loop to print the numbers from 1 to 5 in series."
    const code = `
    //Define Class
    public class PrintNumbers {
        //Define Function
        public static void main(String[] args) {
            //For loop
            for (int i = ___; i ___ 5; i___ ) {
                //Print Statement
                System.out.println(i);
            //Closing Bracket
            }
        }
    }
    `;

    const correctAnswers = ["1", "<=", "++"];



    const handleRun = async () => {
        const userAnswers = Object.values(userInputs);
        console.log("User Answers:", userAnswers);
        const codeDisplayValidation = document.getElementById("code-display-validation");
        codeDisplayValidation?.click();

        // Validate user answers
        const isCorrect = correctAnswers.every((answer, index) => {
            return completedCode.includes(answer);
        });

        if (onRunCode) {
            onRunCode(completedCode, isCorrect); // Pass the correctness flag
        }

        if (isCorrect) {

        } else {

            // Call ChatGPT API for debugging suggestions
            setIsTyping(true);
            await callChatGPTAPI(userAnswers);
            setIsTyping(false);
        }


    };

    const callChatGPTAPI = async (userAnswers) => {
        try {
            const response = await fetch("http://localhost:5001/api/debug", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    templateCode: code,
                    problemStatement: problemStatement,
                    userAnswers,
                    correctAnswers,
                }), // Pass the user's answers to the backend
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Append ChatGPT's debugging suggestion
            setBotMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: `Debugging Suggestion : ${data.suggestion}` },
            ]);
        } catch (error) {
            setBotMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: `Error fetching debugging details` },
            ]);
            console.log("Error", error)
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
