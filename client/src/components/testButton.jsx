import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TestButton = ({ studentId, moduleId, type, isDisabled, onPreTestComplete }) => {
    const navigate = useNavigate();
    console.log("isDisabled", isDisabled);
    const [checked, setChecked] = useState(false);

    const fetchProgress = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/student-test-progress/${studentId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch progress");
            }

            const progressData = await response.json();
            const testField = `${type}-${moduleId}`;

            console.log("Checking for testField:", testField);
            console.log("Progress Data from API:", progressData.tests);

            // ✅ Update checkbox without refreshing
            const isTestCompleted = progressData.tests?.[testField] || false;
            setChecked(isTestCompleted);

            // ✅ Notify the parent (Dashboard) when the pre-test is done
            if (type === "pre-test" && isTestCompleted && onPreTestComplete) {
                onPreTestComplete(moduleId);
            }

        } catch (error) {
            console.error("Error fetching progress:", error);
        }
    };

    useEffect(() => {
        fetchProgress(); // ✅ Fetch progress on mount
    }, [studentId, moduleId, type]);

    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (isDisabled) return;
        let storedStudentId = sessionStorage.getItem("studentId") || studentId;
        if (!storedStudentId) {
            console.error("Student ID missing. Redirecting to login.");
            navigate("/");
            return;
        }

        const targetURL = type === "pre-test"
            ? `/pre-test/${moduleId}?studentId=${storedStudentId}`
            : `/post-test/${moduleId}?studentId=${storedStudentId}`;


        const testWindow = window.open(targetURL, "_blank");

        // ✅ Check for test completion when the window is closed
        const checkTestCompletion = setInterval(() => {
            if (testWindow?.closed) {
                clearInterval(checkTestCompletion);
                fetchProgress(); // ✅ Refresh checkbox state after test completion
            }
        }, 2000);
    };
    return (

        <div className={`questionButton ${isDisabled ? "disabled" : ""}`}>
            <input
                type="checkbox"
                checked={checked}
                // onChange={handleCheckboxChange}
                disabled //
                className="questionCheckbox"
            />
            <h2 className="poppins-medium" onClick={!isDisabled ? handleClick : undefined}>
                {type === "pre-test" ? "Pre Test" : "Post Test"}
            </h2>
        </div>
    )
}

export default TestButton