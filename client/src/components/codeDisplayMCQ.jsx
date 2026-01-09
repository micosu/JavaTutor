import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Props are code to be displayed
const CodeDisplayMCQ = ({ code }) => {
    return (
        <div className="codeDisplayMCQ" onContextMenu={(e) => e.preventDefault()}>
            <SyntaxHighlighter 
                language="java" 
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: '10px',
                    backgroundColor: '#101827',
                    fontSize: '14px'
                }}
                codeTagProps={{
                    style: {
                        color: '#d4d4d4',
                        fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace'
                    }
                }}
                wrapLongLines={true}
                useInlineStyles={true}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeDisplayMCQ;