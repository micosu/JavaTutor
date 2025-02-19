import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../assets/css/dashboard.css'

import SidePanel from "../components/sidePanel";
import Name from "../components/name";
import IntroBlock from "../components/introBlock";
import ModuleName from "../components/moduleName";
import QuestionButton from "../components/questionButton";

import book from "../assets/images/book.svg"

const modulesData = [
    {
        name: "CIT 111 Pre-test quiz",
        type: "test", // This is a test, so redirect
        route: "/pre-test"
    },
    {
        name: "CIT 111 Module 1: Control structures",
        type: "module",
        questions: ["Question 1", "Question 2", "Question 3"]
    },
    {
        name: "CIT 111 Module 2: Loops",
        type: "module",
        questions: ["Question 1", "Question 2", "Question 3"]
    },
    {
        name: "CIT 111 Module 3: Methods",
        type: "module",
        questions: ["Question 1", "Question 2", "Question 3"]
    },
    {
        name: "CIT 111 Post-test quiz",
        type: "test", // This is a test, so redirect
        route: "/post-test"
    }
];

const Dashboard = () => {

    
    const [activeModule, setActiveModule] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const studentId = sessionStorage.getItem("studentId");
        if (!studentId) {
            navigate("/"); // ✅ Redirect to login if not logged in
        }
    }, [navigate]);

    const handleModuleClick = (index, module) => {
        if (module.type === "test") {
            navigate(module.route); // Redirect for test modules
        } else {
            setActiveModule(activeModule === index ? null : index); // Toggle dropdown for other modules
        }
    };

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const studentId = queryParams.get("studentId");

    const [studentName, setStudentName] = useState("");

    useEffect(() => {
        if (!studentId) return; // Don't fetch if no studentId is provided

        const fetchStudentName = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/student/${studentId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch student data");
                }
                const data = await response.json();
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
                                className="moduleButton"
                            >
                                <ModuleName name={module.name} />
                            </div>

                            {/* Show questions only when a module is clicked */}
                            {activeModule === index && module.type === "module" && (
                                <div className="questions">
                                    {module.questions.map((question, qIndex) => (
                                        <QuestionButton
                                            key={qIndex}
                                            studentId={studentId} // Pass studentId
                                            moduleId={index}
                                            questionId={qIndex + 1}
                                            question={question}
                                        />
                                    ))}
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