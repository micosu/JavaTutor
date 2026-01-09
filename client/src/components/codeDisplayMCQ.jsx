import React from "react";

// Props are code to be displayed
const CodeDisplayMCQ = ({ code }) => {
    // Function to render each line with comment highlighting
    const renderCodeWithComments = (codeString) => {
        if (!codeString) return null;
        
        return codeString.split("\n").map((line, index) => {
            const isComment = line.trimStart().startsWith("//");
            
            return (
                <div key={index} style={{ 
                    whiteSpace: 'pre-wrap', 
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                }}>
                    <span style={{ color: isComment ? '#4CAF50' : 'inherit' }}>
                        {line}
                    </span>
                </div>
            );
        });
    };

    return (
        <div 
            className="codeDisplayMCQ" 
            onContextMenu={(e) => e.preventDefault()}
            style={{ 
                overflowX: 'auto',
                maxWidth: '100%'
            }}
        >
            <pre style={{ 
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
            }}>
                <code>
                    {renderCodeWithComments(code)}
                </code>
            </pre>
        </div>
    );
};

export default CodeDisplayMCQ;