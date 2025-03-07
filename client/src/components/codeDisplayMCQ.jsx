import React from "react";

const CodeDisplayMCQ = ({ code }) => {
    return (
        <div className="codeDisplayMCQ" >
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeDisplayMCQ;