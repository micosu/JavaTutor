import React from "react";

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