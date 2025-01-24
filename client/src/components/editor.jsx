import React, { useState } from "react";
import "../assets/css/tutor.css";

import CodeDisplay from "./codeDisplay";

const Editor = ({ onRunCode }) => {
    const [completedCode, setCompletedCode] = useState("");

    const handleCodeChange = (fullCode) => {
        setCompletedCode(fullCode);
    };

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

    const handleRun = () => {
        // Trigger validation in CodeDisplay
        const codeDisplayValidation = document.getElementById("code-display-validation");
        codeDisplayValidation?.click();

        if (onRunCode) {
            onRunCode(completedCode); // Send the full code to the parent component or API
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
                />
            </div>
        </div>
    );
};

export default Editor;
