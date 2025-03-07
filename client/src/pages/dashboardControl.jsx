import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../assets/css/dashboard.css'

import SidePanel from "../components/sidePanel";
import Name from "../components/name";
import IntroBlock from "../components/introBlock";
import ModuleName from "../components/moduleName";
import QuestionButton from "../components/questionButton";
import TestButton from "../components/testButton";

import book from "../assets/images/book.svg"

const modulesData = [
    {
        name: "Consent Form",
        type: "test", // This is a test, so redirect
        route: "/consent-form"
    },
    // {
    //     name: "CIT 111 Pre-test quiz",
    //     type: "test", // This is a test, so redirect
    //     route: "/pre-test"
    // },
    {
        name: "CIT 111 Module 1: Control structures",
        type: "module",
        questions: [
            { text: "Question 1", questionType: "tutor" },
            { text: "Question 2", questionType: "tutor" },
            { text: "Question 3", questionType: "tutor" }, // Multiple-choice question
            { text: "Question 4", questionType: "tutor" }, // Multiple-choice question
            { text: "Question 5", questionType: "mcq" }, // Multiple-choice question
        ]
    },
    {
        name: "CIT 111 Module 2: Loops",
        type: "module",
        questions: [
            { text: "Question 1", questionType: "tutor" },
            { text: "Question 2", questionType: "tutor" },
            { text: "Question 3", questionType: "tutor" }, // Multiple-choice question
            { text: "Question 4", questionType: "tutor" }, // Multiple-choice question
            { text: "Question 5", questionType: "tutor" }, // Multiple-choice question
            { text: "Question 6", questionType: "tutor" },
            { text: "Question 7", questionType: "tutor" },
            { text: "Question 8", questionType: "tutor" },
            { text: "Question 9", questionType: "mcq" },
            { text: "Question 10", questionType: "mcq" },
            { text: "Question 11", questionType: "mcq" },
            { text: "Question 12", questionType: "mcq" },
        ]
    },
    {
        name: "CIT 111 Module 3: Methods",
        type: "module",
        questions: [
            { text: "Question 1", questionType: "tutor" },
            { text: "Question 2", questionType: "tutor" },
            { text: "Question 3", questionType: "tutor" }, // Multiple-choice question
            { text: "Question 4", questionType: "tutor" }, // Multiple-choice question
            { text: "Question 5", questionType: "tutor" }, // Multiple-choice question
        ]
    },
    // {
    //     name: "CIT 111 Post-test quiz",
    //     type: "test", // This is a test, so redirect
    //     route: "/post-test"
    // }
];

const Dashboard = () => {
    const [activeModule, setActiveModule] = useState(null);
    const [studentId, setStudentId] = useState("");
    const [hasConsent, setHasConsent] = useState(false); // Store consent status
    const navigate = useNavigate();
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState("");
    const [showMessage, setShowMessage] = useState(true);

    const timer = setTimeout(() => {
        setSuccessMessage((prev) => (prev ? "hidden" : ""));
        setTimeout(() => setSuccessMessage(""), 1000); // Fully remove after fade out
    }, 5000);

    useEffect(() => {
        // Scroll to the top when the page loads
        window.scrollTo(0, 0);

        // Retrieve the success message from sessionStorage
        const message = sessionStorage.getItem("consentSuccessMessage");

        if (message) {
            setSuccessMessage(message);
            sessionStorage.removeItem("consentSuccessMessage"); // Remove from session storage

            // Delay fade-out after 4 seconds
            setTimeout(() => {
                setShowMessage(false);
            }, 4000);

            // Fully remove message after 5 seconds
            setTimeout(() => {
                setSuccessMessage("");
            }, 5000);
        }
    }, []);

    useEffect(() => {
        let storedStudentId = sessionStorage.getItem("studentId");

        if (!storedStudentId) {
            const queryParams = new URLSearchParams(location.search);
            storedStudentId = queryParams.get("studentId");

            if (storedStudentId) {
                sessionStorage.setItem("studentId", storedStudentId); // ✅ Save it in session
            }
        }

        if (!storedStudentId) {
            navigate("/"); // ✅ Redirect to login if missing
        } else {
            setStudentId(storedStudentId);
        }
    }, [navigate, location.search]);

    useEffect(() => {
        if (!studentId) return;

        const fetchConsentStatus = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/checkConsent/${studentId}`);
                if (!response.ok) throw new Error("Failed to fetch consent status");

                const data = await response.json();
                setHasConsent(data.hasConsent);
            } catch (error) {
                console.error("Error checking consent status:", error);
            }
        };

        fetchConsentStatus();
    }, [studentId]);
    const handleModuleClick = (index, module) => {
        if (module.type === "test") {
            navigate(module.route); // Redirect for test modules
        } else {
            setActiveModule(prev => (prev === index ? null : index)); // Toggle dropdown for other modules
        }
    };



    const queryParams = new URLSearchParams(location.search);


    const [studentName, setStudentName] = useState("");
    const [studentGroup, setStudentGroup] = useState("");

    useEffect(() => {
        if (!studentId) return; // Don't fetch if no studentId is provided

        const fetchStudentName = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/student/${studentId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch student data");
                }
                const data = await response.json();
                setStudentGroup(data.type);
                console.log("Student data fetched from dashboard:", data);
                setStudentName(data.name); // Update state with fetched name
            } catch (error) {
                console.error("Error fetching student data:", error);
                setStudentName("Unknown Student"); // Fallback if error occurs
            }
        };

        fetchStudentName();
    }, [studentId]);
    return (
        <div className="dashboard">
            <div className="sidePanelDiv">
                <SidePanel />
            </div>
            <div className="content">
                {successMessage && (
                    <div className={`success-message ${showMessage ? "visible" : "fade-out"}`}>
                        {successMessage}
                    </div>
                )}

                <Name name={studentName} />
                <IntroBlock title="Java Tutor" content="The Java Tutor can give you adaptive feedback and run your code in the environment. You can also chat with the tutor to ask for more hints and feedback!" />
                <div className="modulesTitle">
                    <div className="bookIcon"><img src={book} alt="book" /></div>
                    <div>
                        <p className="inter-regular">Tutor Modules</p>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="modules">
                    {modulesData.map((module, index) => (
                        <div key={index}>
                            <div
                                onClick={() => handleModuleClick(index, module)}
                                className={`moduleButton ${!hasConsent && module.type !== "test" ? "disabled" : ""}`}
                            >
                                <ModuleName name={module.name} />
                            </div>

                            {/* Show questions only when a module is clicked */}
                            {activeModule === index && module.type === "module" && hasConsent && (
                                <div className="questions">
                                    <TestButton studentId={studentId} moduleId={index} type="pre-test" />

                                    {module.questions.map((question, qIndex) => (
                                        <QuestionButton
                                            key={qIndex}
                                            studentId={studentId} // Pass studentId
                                            moduleId={index}
                                            questionId={qIndex + 1}
                                            question={question}
                                            type = {studentGroup}
                                        />
                                    ))}

                                    <TestButton studentId={studentId} moduleId={index} type="post-test" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard