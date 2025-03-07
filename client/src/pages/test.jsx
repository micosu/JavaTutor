import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { tests } from "../constantTests";
import "../assets/css/test.css";

const TestPage = () => {
    const { moduleId } = useParams();
    const searchParams = new URLSearchParams(window.location.search);
    const studentId = searchParams.get("studentId");

    // Determine if it's a pre-test or post-test
    const testType = window.location.pathname.includes("pre-test") ? "pre-test" : "post-test";

    // Find the corresponding test
    const test = tests.find((t) => t.id === `${testType}-${moduleId}`);

    const [answers, setAnswers] = useState({});

    if (!test) {
        return <h1 className="error-text">Test not found</h1>;
    }

    const handleOptionChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const correctAnswers = test.questions.reduce((acc, q) => {
                acc[q.id] = q.options.indexOf(q.answer); // ✅ Stores correct answer as index
                return acc;
            }, {});



            console.log("correct answers - ", correctAnswers)
            console.log("Users answer - ", answers)
            const response = await fetch("http://localhost:5001/api/submit-test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    studentId,
                    testType,
                    title: moduleId,
                    answers,
                    correctAnswers
                })
            });

            if (!response.ok) {
                throw new Error("Failed to submit test");
            }

            const data = await response.json();
            console.log("Result obtained - ", data)
            alert("Test submitted successfully!");
        } catch (error) {
            console.error("Error submitting test:", error);
            alert("Failed to submit test.");
        }
    };


    return (
        <div className="test-container">
            <h1 className="test-title">{test.title}</h1>
            {/* <p className="student-id">Student ID: {studentId}</p> */}

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

            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default TestPage;
