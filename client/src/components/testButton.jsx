//  Pre-test and post-test buttons

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

// Props - studentId, moduleId, type(pre-test or post-test), isDisabled, onPreTestComplete (callback to mark completion of the test), setSuccessMessageTest (success message when test is successfully submitted), setShowMessageTest (callback to show success message)
const TestButton = ({ studentId, moduleId, type, isDisabled, onPreTestComplete, setSuccessMessageTest,
    setShowMessageTest }) => {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [isTestCompleted, setIsTestCompleted] = useState(false); // ✅ Track if test is completed

    // TO check which tests students have completed
    const fetchProgress = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/student-test-progress/${studentId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch progress");
            }

            const progressData = await response.json();
            const testField = `${type}-${moduleId}`;

    
            // ✅ Update checkbox without refreshing
            const isTestCompleted = progressData.tests?.[testField] || false;
            setChecked(isTestCompleted);
            setIsTestCompleted(isTestCompleted);

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

    // When students click the test button
    const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (isTestCompleted || isDisabled) return;
        let storedStudentId = sessionStorage.getItem("studentId") || studentId;
        if (!storedStudentId) {
            navigate("/");
            return;
        }

        // Going to pre-test or post-test
        const targetURL = type === "pre-test"
            ? `/pre-test/${moduleId}?studentId=${storedStudentId}`
            : `/post-test/${moduleId}?studentId=${storedStudentId}`;


        // Opening test in a different window
        const testWindow = window.open(targetURL, "_blank");

        // ✅ Check for test completion when the window is closed
        const checkTestCompletion = setInterval(() => {
            if (testWindow?.closed) {
                clearInterval(checkTestCompletion);
                fetchProgress(); // ✅ Refresh checkbox state after test completion

                const message = localStorage.getItem("testSuccessMessage");
                if (message) {
                    if (setSuccessMessageTest && setShowMessageTest) {
                        setSuccessMessageTest(message);
                        setShowMessageTest(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });

                        setTimeout(() => setShowMessageTest(false), 4000);
                        setTimeout(() => setSuccessMessageTest(""), 5000);
                    }

                    sessionStorage.removeItem("testSuccessMessage");
                    localStorage.removeItem("testSuccessMessage");
                }
            }
        }, 2000);
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
            <h2 className="poppins-medium" >
                {type === "pre-test" ? "Pre Test" : "Post Test"}
            </h2>
        </div>
    )
}

export default TestButton