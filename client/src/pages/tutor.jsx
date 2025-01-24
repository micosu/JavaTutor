import React, { useState } from "react";
import '../assets/css/tutor.css'

import Header from '../components/header'
import Problem from '../components/problem'
import Bot from '../components/bot'
import Editor from '../components/editor'
import Output from '../components/output'


const Tutor = () => {
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false); // Track loading state

    const sanitizeCode = (code) => {
        return code
            .replace(/\u00A0/g, " ") // Replace non-breaking spaces with normal spaces
            .replace(/\t/g, "    ") // Replace tabs with spaces
            .trim(); // Remove leading and trailing whitespace
    };

    const runCode = async (code) => {
        console.log("Sending this code:", code);
        const sanitizedCode = sanitizeCode(code);
        const url = "http://localhost:5001/api/execute";

        const requestBody = {
            clientId: "19f502d67b809bb3491c24a025bcef54", // Replace with your actual Client ID
            clientSecret: "20b8c7fc700ea1e56ee3076675ca8bda7192ebd799aa5101a620728c27d30dd6", // Replace with your actual Client Secret
            script: sanitizedCode, // The Java code you want to execute
            stdin: "",
            language: "java",
            versionIndex: "4", // Use the appropriate versionIndex for Java
            compileOnly: false, // Set this to true if you only want to compile the code
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Execution result:", data);
            return data; // Returns the response, which includes the output
        } catch (error) {
            console.error("Error executing code:", error);
            return { error: error.message };
        }
    };

    const handleRunCode = async (code) => {
        setLoading(true); // Start loading
        const result = await runCode(code); // Call the JDoodle API
        setLoading(false); // End loading

        if (result.error) {
            setOutput(`Error: ${result.error}`);
        } else {
            setOutput(result.output); // Display the output
        }
    };

    return (
        <div className="tutor">
            <Header topic={"Loops in Java"} problem={"Problem 1"} />
            <div className="topPart">
                <Problem statement={"Write a Java Program to run a for loop to print the numbers from 1 to 5 in series."} input={"There is no input for this question"} output={"1 2 3 4 5"} />
                <Editor onRunCode={handleRunCode} />
            </div>
            <div className="bottomPart">
                <Bot />
                <Output output={output} loading={loading} />
            </div>
        </div>
    )
}

export default Tutor