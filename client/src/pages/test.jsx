// Pre and Post Test Page

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tests } from "../constantTests";
import "../assets/css/test.css";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const COUNTERBALANCED_STUDENTS = process.env.REACT_APP_COUNTERBALANCED || "";
const TestPage = () => {
    const { moduleId } = useParams();
    const searchParams = new URLSearchParams(window.location.search);
    const studentId = searchParams.get("studentId");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const counter_balanced = COUNTERBALANCED_STUDENTS.split(",");
    const rollNumber = sessionStorage.getItem("rollNumber");

    const checkCB = async (studentId) => {
        if (!studentId) return;

        try {
            // Check if consent was filled
            const response = await fetch(`${BASE_URL}/api/counter-balanced/${studentId}`);
            if (!response.ok) throw new Error("Failed to fetch consent status");

            const data = await response.json();
            return data === "True";
        } catch (error) {
            console.error("Error checking CB status:", error);
        }
    };

    const [isCounterBalanced, setIsCounterBalanced] = useState(false);
    useEffect(() => {
        const checkStatus = async () => {
            const cbResult = await checkCB(studentId);
            setIsCounterBalanced(counter_balanced.includes(rollNumber) || cbResult);
        };
        checkStatus();
    }, [studentId, rollNumber]);

    console.log("CB? ", isCounterBalanced);
    const moduleNames = {
        "1": "Control Structures",
        "2": "Loops",
        "3": "Methods"
    };

    const moduleName = moduleNames[moduleId] || "this module"; // fallback if not found

    // testType: the actual placement of the test.  Tells you if student took this test at the beginning or end of the module
    const testType = window.location.pathname.includes("pre-test") ? "pre-test" : "post-test";
    // testForm: the actual test given to students.  If in counter-balanced group, they see the post-test as their pre-test
    const testForm = isCounterBalanced ? (testType === "pre-test" ? "post-test" : "pre-test") : testType;

    // Find the corresponding test
    const test = tests.find((t) => t.id === `${testForm}-${moduleId}`);

    const [answers, setAnswers] = useState({});
    const [reflectionResponse, setReflectionResponse] = useState("");

    if (!test) {
        return <h1 className="error-text">Test not found</h1>;
    }

    const handleOptionChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));

        const sessionId = localStorage.getItem("sessionId");
        const studentGroup = sessionStorage.getItem("studentGroup");
        const timestamp = new Date().toISOString();

        const question = test.questions.find(q => q.id === questionId);
        const correctAnswerIndex = question.options.indexOf(question.answer);
        const correctAnswerText = question.answer;

        const isCorrect = value === correctAnswerIndex;
        
        // Log test interactions to the backend collection testInteractions
        fetch(`${BASE_URL}/api/log-test-event`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sessionId,
                studentId,
                moduleId,
                questionId,
                eventType: "test-mcq-try",
                userAnswerIndex: value,
                userAnswerText: question.options[value],
                correctAnswerIndex,
                correctAnswerText,
                isCorrect,
                timestamp,
                studentGroup,
                testType,
                testForm
            }),
        });

    };

    // Submitting the test
    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const correctAnswers = test.questions.reduce((acc, q) => {
                acc[q.id] = q.options.indexOf(q.answer); // ✅ Stores correct answer as index
                return acc;
            }, {});


            const sessionId = localStorage.getItem("sessionId");
            const studentGroup = sessionStorage.getItem("studentGroup");
            const timestamp = new Date().toISOString();

            // Calling submit test api
            const response = await fetch(`${BASE_URL}/api/submit-test`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    studentId,
                    testType,
                    testForm,
                    title: moduleId,
                    answers,
                    correctAnswers,
                    reflectionResponse: testType === "post-test" ? reflectionResponse : null // Only send for post-test
                })
            });

            if (!response.ok) {
                throw new Error("Failed to submit test");
            }


            const data = await response.json();
           
            // Logging test submission which includes all the user answers to the backend collection of testInteractions
            await fetch(`${BASE_URL}/api/log-test-event`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId,
                    studentId,
                    moduleId,
                    eventType: "test-submit",
                    testType,
                    testForm,
                    userAnswers: answers,
                    correctAnswers,
                    reflectionResponse: testType === "post-test" ? reflectionResponse : null,
                    score: data.score,
                    timestamp: new Date().toISOString(),
                    studentGroup
                }),
            });

            const message = testType === "post-test"
                ? `✅ Post-test submitted!`
                : `✅ Pre-test submitted successfully!`;
            sessionStorage.setItem("testSuccessMessage", message);
            localStorage.setItem("testSuccessMessage", message);
            setTimeout(() => {
                window.close();
            }, 3000);

        } catch (error) {
            console.error("Error submitting test:", error);
            alert("Failed to submit test.");
            setIsSubmitting(false);
        }
    };


    return isSubmitting ? (
        <div className="loader-overlay" >
            <div className="spinnerTest"></div>
            <p>Submitting your test, please wait...</p>
        </div >
    ) : (
        <div className="test-container">
            <h1 className="test-title">{testType === "pre-test" ? "Pre-Test " : "Post-Test "} {test.title}</h1>
        
            {test.questions.map((q) => (
                <div key={q.id} className="question-card">
                    <p className="question-text">{q.question}</p>
                    {q.code && <pre className="code-block">{q.code}</pre>}

                    <div className="options-container">
                        {q.options.map((option, index) => (
                            <label key={index} className="option-label">
                                <input
                                    type="radio"
                                    name={`q${q.id}`}
                                    value={index}
                                    className="option-input"
                                    onChange={() => handleOptionChange(q.id, index)} />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            {/* Reflection question (only for post-test) */}
            {testType === "post-test" && (
                <div className="reflection-container">
                    <label className="reflection-label">Reflection Question:</label>
                    <textarea
                        className="reflection-textarea"
                        placeholder={
                            moduleNames[moduleId]
                                ? `What did you learn from the module '${moduleNames[moduleId]}'?`
                                : `What did you learn from this module?`
                        }
                        value={reflectionResponse}
                        onChange={(e) => setReflectionResponse(e.target.value)}
                    />
                </div>
            )}

            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    );
}


export default TestPage;
