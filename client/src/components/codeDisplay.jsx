// The code editor component, that displays the code as fill in the blanks.

// Importing the required dependencies
import React, { useState, useRef, useEffect } from "react";

// Props - codeString (the code to be displayed), onCodeChange (callback function to update the full code), correctAnswers (the correct answers for each blank) onInputChange(callback function to update the user inputs)
// Helper function for getting index of user input
const getInputPositions = (codeString) => {
    const positions = [];
    let blankIndex = 0;
    
    codeString.split("\n").forEach((line, lineIndex) => {
        const parts = line.split("___");
        parts.forEach((part, partIndex) => {
            if (partIndex < parts.length - 1) {
                positions.push({
                    lineIndex,
                    partIndex,
                    blankIndex: blankIndex++,
                    key: `${lineIndex}-${partIndex}`
                });
            }
        });
    });
    return positions;
};

const CodeDisplay = ({ codeString, onCodeChange, correctAnswers, onInputsChange }) => {
    const sessionId = localStorage.getItem("sessionId");
    const [inputs, setInputs] = useState(new Array(correctAnswers.length).fill('')); // To track user input for blanks
    const [inputStyles, setInputStyles] = useState({}); // To track border styles for inputs

    const validateRef = useRef(() => { });
    const inputPositions = getInputPositions(codeString);
    // Update inputs as user types

    // Handling input change
    const handleChange = (index, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = value || "";
        setInputs(updatedInputs);

        if (onInputsChange) {
            onInputsChange(index, value);
        }

        // Notify parent component of the updated full code
        if (onCodeChange) {
            const fullCode = constructFullCode(updatedInputs);
            onCodeChange(fullCode);
        }
    };

    // Inside useEffect so the latest `inputs` are always captured
    useEffect(() => {
        validateRef.current = () => {
            const updatedStyles = {};
            let blankIndex = 0;

            codeString.split("\n").forEach((line, lineIndex) => {
                const parts = line.split("___");
                parts.forEach((part, partIndex) => {
                    if (partIndex < parts.length - 1) {
                        const key = `${lineIndex}-${partIndex}`;
                        const userAnswer = (inputs[blankIndex] || "").replace(/\s+/g, '');
                        const correctAnswer = (correctAnswers[blankIndex] || ""); // don't need to replace white spaces because that's done in editor.jsx
                        
                        updatedStyles[key] = userAnswer === correctAnswer ? "4px solid #1cf306" : "4px solid red";
                        blankIndex++;
                    }
                });
            });

            setInputStyles(updatedStyles);
        };
    }, [inputs, correctAnswers, codeString]);

    // Construct the full code with user inputs
    const constructFullCode = (currentInputs = inputs) => {
        let blankIndex = 0;
        return codeString
            .split("\n")
            .map((line) => {
                const parts = line.split("___");
                return parts
                    .map((part, partIndex) => {
                        if (partIndex < parts.length - 1) {
                            return part + (currentInputs[blankIndex++] || "");
                        }
                        return part;
                    })
                    .join("");
            })
            .join("\n");
    };

    // Parse code into lines with placeholders and inputs
    const codeWithInputs = codeString.split("\n").map((line, lineIndex) => {
        const isComment = line.trimStart().startsWith("//");
        const parts = line.split("___");
        
        return (
            <div className="courier-prime-regular codeLines" key={lineIndex}
                 style={{ whiteSpace: "pre-wrap", userSelect: "none" }}
                 onContextMenu={(e) => e.preventDefault()}>
                {parts.map((part, partIndex) => {
                    const position = inputPositions.find(p => 
                        p.lineIndex === lineIndex && p.partIndex === partIndex
                    );
                    
                    return (
                        <React.Fragment key={partIndex}>
                            <span style={{ fontSize: "18px", color: isComment ? "green" : "white" }}>
                                {part}
                            </span>
                            {position && (
                                <input
                                    type="text"
                                    value={inputs[position.blankIndex] || ""}
                                    onChange={(e) => handleChange(position.blankIndex, e.target.value)}
                                    style={{
                                        display: "inline-block",
                                        width: "50px",
                                        margin: "0 5px",
                                        padding: "2px",
                                        fontSize: "14px",
                                        border: inputStyles[position.key] || "1px solid #ccc",
                                        borderRadius: "4px",
                                    }}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    });

    return (
        <div
            style={{
                background: "#1C2432",
                padding: "10px",
                borderRadius: "5px",
                overflowX: "auto",
            }}
        >
            {codeWithInputs}
            {/* Hidden button for triggering validation */}
            <button
                id="code-display-validation"
                style={{ display: "none" }}
                onClick={() => validateRef.current()}
            />
        </div>
    );
};

export default CodeDisplay;
