// This file is the component for the code editor in the MCQ page. The code is rendered in below Problem Statement.
import React from "react";

// Props are code to be displayed
const CodeDisplayMCQ = ({ code }) => {
    return (
        <div className="codeDisplayMCQ" onContextMenu={(e) => e.preventDefault()} >
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeDisplayMCQ;