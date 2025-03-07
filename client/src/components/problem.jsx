import React from "react";
import '../assets/css/tutor.css';

const Problem = ({ statement, input, output }) => {
    return (
        <div className="problem">
            <p className="problemTitle inter-bold">Problem</p>
            <div className="problemDescription inter-regular">
                <pre className="statement">{statement}</pre>

                <div className="input">
                    <p className="inter-bold">Input Format</p>
                    <p>{input}</p>
                </div>
                <div className="outputProb">
                    <p className="inter-bold">Output Format</p>
                    <p>{output}</p>
                </div>
            </div>
        </div>
    )
}
export default Problem