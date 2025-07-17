// Pre and Post Test Page

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { tests } from "../constantTests";
import "../assets/css/test.css";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";
const TestPage = () => {
    const { moduleId } = useParams();
    const searchParams = new URLSearchParams(window.location.search);
    const studentId = searchParams.get("studentId");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const moduleNames = {
        "1": "Control Structures",
        "2": "Loops",
        "3": "Methods"
    };

    const moduleName = moduleNames[moduleId] || "this module"; // fallback if not found

    // Determine if it's a pre-test or post-test
    const testType = window.location.pathname.includes("pre-test") ? "pre-test" : "post-test";

    // Find the corresponding test
    const test = tests.find((t) => t.id === `${testType}-${moduleId}`);

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
                testType
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
                    userAnswers: answers,
                    correctAnswers,
                    reflectionResponse: testType === "post-test" ? reflectionResponse : null,
                    score: data.score,
                    timestamp: new Date().toISOString(),
                    studentGroup
                }),
            });

            const message = testType === "post-test"
                ? `✅ Post-test submitted! You scored ${data.score}.`
                : "✅ Pre-test submitted successfully!";
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
            <h1 className="test-title">{test.title}</h1>
        
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
