// Displays the output from the java code execution
import React from 'react'

// Props- output - output from the java code, loading - boolean to indicate if the output is loading
const Output = ({ output, loading }) => {
    return (
        <div className="output">
            <p className="inter-bold">Output</p>
            <div className="outputBox">
                {loading ? (
                    <div className="spinner" style={{ textAlign: "center" }}>
                        <div
                            style={{
                                width: "24px",
                                height: "24px",
                                border: "3px solid #ccc",
                                borderTop: "3px solid #4CAF50",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                                margin: "0 auto",
                            }}
                        ></div>
                    </div>
                ) : (
                    <p className="outputText courier-prime-regular">{output || "Waiting for output..."}</p>
                )}
            </div>
        </div>
    )
}

export default Output