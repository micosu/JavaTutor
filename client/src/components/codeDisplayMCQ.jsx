import React from "react";

// Props are code to be displayed
const CodeDisplayMCQ = ({ code }) => {
    // Function to render each line with comment highlighting
    const renderCodeWithComments = (codeString) => {
        if (!codeString) return null;
        
        return codeString.split("\n").map((line, index) => {
            const isComment = line.trimStart().startsWith("//");
            
            return (
                <div key={index} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    <span style={{ color: isComment ? '#4CAF50' : 'inherit' }}>
                        {line}
                    </span>
                </div>
            );
        });
    };

    return (
        <div className="codeDisplayMCQ" onContextMenu={(e) => e.preventDefault()}>
            <pre style={{ margin: 0 }}>
                <code>
                    {renderCodeWithComments(code)}
                </code>
            </pre>
        </div>
    );
};

export default CodeDisplayMCQ;