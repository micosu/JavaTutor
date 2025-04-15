import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

const QuestionButton = ({ studentId, moduleId, questionId, question, type, isDisabled, onQuestionComplete }) => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    console.log("You got this in the parameters", studentId, moduleId, questionId, question, type);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                console.log("Fetching progress for:", studentId);
                const response = await fetch(`${BASE_URL}/api/student-progress/${studentId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch progress");
                }

                const completedQuestions = await response.json(); // ✅ Directly an array
                console.log("Raw student progress data received:", completedQuestions);

                // ✅ Remove empty string entries
                const filteredProgress = completedQuestions.filter(q => typeof q === "object");
                console.log("Filtered progress (without empty strings):", filteredProgress);

                // ✅ Ensure moduleId and questionId are compared as strings
                const isCompleted = filteredProgress.some(q =>
                    String(q.moduleId) === String(moduleId) && String(q.questionId) === String(questionId)
                );
                console.log("Is the question completed?", isCompleted);

                setChecked(isCompleted);

                if (isCompleted && onQuestionComplete) {
                    onQuestionComplete(moduleId);
                }
            } catch (error) {
                console.error("Error fetching progress:", error);
            }
        };



        fetchProgress();

        // ✅ Poll progress every 5 seconds (optional, but ensures real-time updates)
        const interval = setInterval(fetchProgress, 5000);

        return () => clearInterval(interval);
    }, [studentId, moduleId, questionId]);

    const handleCheckboxChange = async () => {
        const newCheckedState = !checked;
        setChecked(newCheckedState);

        try {
            const response = await fetch(`${BASE_URL}/api/student-progress"`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ studentId, moduleId, questionId, isChecked: newCheckedState })
            });

            if (!response.ok) {
                throw new Error("Failed to update progress");
            }
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    };


    const handleClick = (event) => {
        event.preventDefault(); // ✅ Prevents any default button action
        event.stopPropagation();
        if (isDisabled) return;
        let storedStudentId = sessionStorage.getItem("studentId") || studentId;

        console.log("Navigating with studentId:", storedStudentId); // Debugging log

        if (!storedStudentId) {
            console.error("Student ID missing. Redirecting to login.");
            navigate("/"); // ✅ Redirect to login if missing
            return;
        }

        let targetURL = ""
        console.log("Student type is ", type)
        if (type == "test") {
            targetURL = question.questionType === "mcq"
                ? `/mcq/${moduleId}/${questionId}?studentId=${storedStudentId}`
                : `/tutor/${moduleId}/${questionId}?studentId=${storedStudentId}`;

        } else if (type == "control") {
            targetURL = question.questionType === "mcq"
                ? `/mcqControl/${moduleId}/${questionId}?studentId=${storedStudentId}`
                : `/tutorControl/${moduleId}/${questionId}?studentId=${storedStudentId}`;
        }

        console.log("Manually redirecting to:", targetURL);

        window.open(targetURL, "_blank");
    };

    return (
        <div className={`questionButton ${isDisabled ? "disabled" : ""}`}>
            <input
                type="checkbox"
                checked={checked}
                disabled
                className="questionCheckbox"
            />
            <h2 className="poppins-medium" onClick={!isDisabled ? handleClick : undefined}>
                {question.text}
            </h2>
        </div>
    );
};

export default QuestionButton;
