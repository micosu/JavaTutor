import React, { useState, useRef, useEffect } from "react";

const CodeDisplay = ({ codeString, onCodeChange, correctAnswers, onInputsChange }) => {
    const [inputs, setInputs] = useState({}); // To track user input for blanks
    const [inputStyles, setInputStyles] = useState({}); // To track border styles for inputs

    const validateRef = useRef(() => { });
    // Update inputs as user types
    const handleChange = (key, value) => {
        const updatedInputs = { ...inputs, [key]: value || "" }; // Ensure no undefined values
        setInputs(updatedInputs);

        if (onInputsChange) {
            onInputsChange(updatedInputs);
        }

        // Notify parent component of the updated full code
        if (onCodeChange) {
            const fullCode = constructFullCode(updatedInputs);
            onCodeChange(fullCode);
        }
    };

    // Validate inputs when the Run button is clicked
    // const validateInputs = () => {
    //     const updatedStyles = {};

    //     // Iterate through each placeholder and check against correct answers
    //     Object.keys(inputs).forEach((key, index) => {
    //         const userAnswer = (inputs[key] || "").trim();
    //         const correctAnswer = (correctAnswers[index] || "").trim();
    //         updatedStyles[key] =
    //             userAnswer === correctAnswer ? "4px solid #1cf306" : "4px solid red";
    //     });

    //     setInputStyles(updatedStyles); // Update the input styles based on validation
    // };

    // Inside useEffect so the latest `inputs` are always captured
    useEffect(() => {
        validateRef.current = () => {
            const updatedStyles = {};

            Object.keys(inputs).forEach((key, index) => {
                const userAnswer = (inputs[key] || "").trim();
                const correctAnswer = (correctAnswers[index] || "").trim();

                updatedStyles[key] =
                    userAnswer === correctAnswer ? "4px solid #1cf306" : "4px solid red";
            });

            setInputStyles(updatedStyles);
        };
    }, [inputs, correctAnswers]);

    // Construct the full code with user inputs
    const constructFullCode = (currentInputs = inputs) => {
        return codeString
            .split("\n")
            .map((line, lineIndex) => {
                const parts = line.split("___");
                return parts
                    .map(
                        (part, partIndex) =>
                            part + (currentInputs[`${lineIndex}-${partIndex}`] || "")
                    )
                    .join("");
            })
            .join("\n");
    };

    // Parse code into lines with placeholders and inputs
    const codeWithInputs = codeString.split("\n").map((line, lineIndex) => {
        const isComment = line.trimStart().startsWith("//");
        const parts = line.split("___");

        return (
            <div
                className="courier-prime-regular codeLines"
                key={lineIndex}
                style={{ whiteSpace: "pre-wrap" }}
            >
                {parts.map((part, partIndex) => {
                    const key = `${lineIndex}-${partIndex}`;
                    return (
                        <React.Fragment key={partIndex}>
                            <span style={{ fontSize: "18px", color: isComment ? "green" : "white" }}>{part}</span>
                            {partIndex < parts.length - 1 && (
                                <input
                                    type="text"
                                    value={inputs[key] || ""}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    style={{
                                        display: "inline-block",
                                        width: "50px",
                                        margin: "0 5px",
                                        padding: "2px",
                                        fontSize: "14px",
                                        border: inputStyles[key] || "1px solid #ccc",
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
