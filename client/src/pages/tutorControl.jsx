// Tutor page for control students

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import '../assets/css/tutor.css'

import Header from '../components/header'
import Problem from '../components/problem'
import Bot from '../components/bot'
import Editor from '../components/editor'
import Output from '../components/output'
import ControlOutput from "../components/controlOutput";
import { modules } from '../constant'

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";
const TutorControl = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { moduleId, questionId } = useParams();
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false); // Track loading state
    const [isTyping, setIsTyping] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(""); // ✅ New state

    const [botMessages, setBotMessages] = useState([
        { sender: "bot", text: "Hi! Welcome to the Java Course. Start coding on the right. If you run into any errors, just ask. If the output is wrong, I will try my best to guide you." },
    ]);

    const queryParams = new URLSearchParams(location.search);
    let studentId = queryParams.get("studentId") || sessionStorage.getItem("studentId");

    useEffect(() => {
        if (!studentId) {
            navigate("/"); // ✅ Redirect to login if not logged in
        } else {
            sessionStorage.setItem("studentId", studentId); // ✅ Store in session
        }
    }, [navigate, studentId]);


    // Finding the matching module and question based on moduleId and questionId
    const module = modules.find(m => m.moduleId === Number(moduleId));
    const question = module ? module.questions.find(q => q.questionId === Number(questionId)) : null;


    useEffect(() => {
        if (!question) {
            console.error("Question not found");
            navigate("/home");
        }
    }, [question, navigate]);

    // Cleaning code to remove extra whitespaces
    const sanitizeCode = (code) => {
        return code
            .replace(/\u00A0/g, " ") // Replace non-breaking spaces with normal spaces
            .replace(/\t/g, "    ") // Replace tabs with spaces
            .trim(); // Remove leading and trailing whitespace
    };

    // Running code
    const runCode = async (code) => {
        const sanitizedCode = sanitizeCode(code);
        const url = `${BASE_URL}/api/execute`;

        // Body requested by JDoodle
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
            return data; // Returns the response, which includes the output
        } catch (error) {
            console.error("Error executing code:", error);
            return { error: error.message };
        }
    };

    // Pressing run button
    const handleRunCode = async (code, isCorrect) => {
        setLoading(true); // Start loading
        const result = await runCode(code); // Call the JDoodle API
        setLoading(false); // End loading

        if (result.error) {
            setOutput(`Error: ${result.error}`);

        } else {
            setOutput(result.output); // Display the output
            if (isCorrect) {
                const successMessage = "Congratulations, you got the right answer and can move on by closing this browser window!";
                setFeedbackMessage(successMessage); // ✅ Update feedback message
                setBotMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "bot", text: successMessage },
                ]);
                try {
                    const response = await fetch(`${BASE_URL}/api/student-progress`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ studentId, moduleId, questionId, isChecked: true })
                    });
                    if (!response.ok) {
                        throw new Error("Failed to update progress");
                    }

                    const refreshProgress = await fetch(`${BASE_URL}/api/student-progress/${studentId}`);
                    const newProgress = await refreshProgress.json();
                } catch (error) {
                    console.error("Error updating progress:", error);
                }
            } else {
                setBotMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "bot", text: "Your code has some issues. Let me help you debug step by step." },
                ]);
            }
        }
    };

    if (!question) return null;
    return (
        <div className="tutor">
            <Header topic={question.headerTopic} problem={`Problem ${questionId}`} />
            <div className="topPart">
                <Problem statement={question.problemStatement}
                    input={question.input}
                    output={question.output} />
                <Editor
                    onRunCode={handleRunCode}
                    setBotMessages={setBotMessages}
                    setIsTyping={setIsTyping}
                    initialCode={question.code}
                    problemStatement={question.problemStatement}
                    initialCorrectAnswers={question.correctAnswers}
                    moduleId={moduleId}
                    questionId={questionId}
                    studentId={studentId}
                />
            </div>
            <div className="bottomPart">
                <ControlOutput CorrectAnswers={question.correctAnswers} studentId={studentId} moduleId={moduleId} questionId={questionId} feedbackMessage={feedbackMessage} />
                <Output output={output} loading={loading} />
            </div>
        </div>
    )
}

export default TutorControl