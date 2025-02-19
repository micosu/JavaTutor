import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuestionButton = ({ studentId, moduleId, questionId, question }) => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        // Fetch student progress when the component mounts
        const fetchProgress = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/student-progress/${studentId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch progress");
                }
                const completedQuestions = await response.json();
                const isCompleted = completedQuestions.some(q => q.moduleId === moduleId && q.questionId === questionId);
                setChecked(isCompleted);
            } catch (error) {
                console.error("Error fetching progress:", error);
            }
        };

        fetchProgress();
    }, [studentId, moduleId, questionId]);

    const handleCheckboxChange = async () => {
        const newCheckedState = !checked;
        setChecked(newCheckedState);

        try {
            const response = await fetch("http://localhost:5001/api/student-progress", {
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


    return (
        <div className="questionButton">
            <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
                className="questionCheckbox"
            />
            <h2 className="poppins-medium" onClick={() => navigate(`/tutor?module=${moduleId}&question=${questionId}`)}>
                {question}
            </h2>
        </div>
    );
};

export default QuestionButton;
