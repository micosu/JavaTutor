// This is the question button component
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

// Props - studentId, moduleId, questionId, question, type (test or control), isDisabled (is the question disabled or not), onQuestionCompletw
const QuestionButton = ({ studentId, moduleId, questionId, question, type, isDisabled, onQuestionComplete }) => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
   
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                // Fetch progress to see how many questions students have completed
                const response = await fetch(`${BASE_URL}/api/student-progress/${studentId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch progress");
                }

                const completedQuestions = await response.json(); // ✅ Directly an array
              
                // Remove empty string entries
                const filteredProgress = completedQuestions.filter(q => typeof q === "object");
                
                // Ensure moduleId and questionId are compared as strings
                const isCompleted = filteredProgress.some(q =>
                    String(q.moduleId) === String(moduleId) && String(q.questionId) === String(questionId)
                );
              
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

    // When student clicks the button
    const handleClick = (event) => {
        event.preventDefault(); // ✅ Prevents any default button action
        event.stopPropagation();
        if (isDisabled) return;
        let storedStudentId = sessionStorage.getItem("studentId") || studentId;

        if (!storedStudentId) {
            navigate("/"); // ✅ Redirect to login if missing
            return;
        }

        let targetURL = ""
       
        // Different tutors for test and control students
        if (type == "test") {
            targetURL = question.questionType === "mcq"
                ? `/mcq/${moduleId}/${questionId}?studentId=${storedStudentId}`
                : `/tutor/${moduleId}/${questionId}?studentId=${storedStudentId}`;

        } else if (type == "control") {
            targetURL = question.questionType === "mcq"
                ? `/mcqControl/${moduleId}/${questionId}?studentId=${storedStudentId}`
                : `/tutorControl/${moduleId}/${questionId}?studentId=${storedStudentId}`;
        }

        window.open(targetURL, "_blank");
    };

    return (
        <div className={`questionButton ${isDisabled ? "disabled" : ""}`} onClick={!isDisabled ? handleClick : undefined} style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}>
            <input
                type="checkbox"
                checked={checked}
                disabled
                className="questionCheckbox"
                onClick={(e) => e.stopPropagation()}
            />
            <h2 className="poppins-medium">
                {question.text}
            </h2>
        </div>
    );
};

export default QuestionButton;
