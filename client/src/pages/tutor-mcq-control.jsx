import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/tutor.css"

import Header from "../components/header";
import ProblemMCQ from "../components/problemMCQ";
import { modules } from '../constant'
import CodeDisplayMCQ from "../components/codeDisplayMCQ";
// import MCQOptions from "../components/mcqQuestion";
import ControlOutputMCQ from "../components/controlOutputMCQ";
import MCQOptionsControl from "../components/mcqQuestionControl";
const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

const TutorMCQControl = () => {
    const { moduleId, questionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [studentId, setStudentId] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");

    useEffect(() => {
        let storedStudentId = sessionStorage.getItem("studentId");
        const queryParams = new URLSearchParams(location.search);
        const urlStudentId = queryParams.get("studentId");

        if (!storedStudentId && urlStudentId) {
            sessionStorage.setItem("studentId", urlStudentId);
            storedStudentId = urlStudentId;
        }

        setStudentId(storedStudentId || "Unknown Student");
    }, [location.search]);

    const module = modules.find(m => m.moduleId === Number(moduleId));
    console.log("Matched module:", module);

    const question = module ? module.questions.find(q => q.questionId === Number(questionId)) : null;
    console.log("Matched question:", question);

    useEffect(() => {
        if (!question) {
            console.error("Question not found");
            navigate("/home");
        }
    }, [question, navigate]);


    const handleMCQFeedback = async (feedbackMessage, sender) => {
        setBotMessages((prevMessages) => [...prevMessages, { sender, text: feedbackMessage }]);
        if (sender === "bot" && feedbackMessage.includes("Congratulations")) {
            setFeedbackMessage(feedbackMessage); // NEW: Store the latest bot feedback
            console.log("Got the right answer?")
            try {
                const response = await fetch(`${BASE_URL}/api/student-progress`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ studentId, moduleId, questionId, isChecked: true })
                });
                console.log("Called API to update progress", response);
                if (!response.ok) {
                    throw new Error("Failed to update progress");
                }

                const refreshProgress = await fetch(`${BASE_URL}/api/student-progress/${studentId}`);
                const newProgress = await refreshProgress.json();
                console.log("Updated progress:", newProgress);
            } catch (error) {
                console.error("Error updating progress:", error);
            }
        }
    };

    const [botMessages, setBotMessages] = useState([
        { sender: "bot", text: "Hi! Welcome to the Java Course. Answer the question on the left." },
    ]);
    const [isTyping, setIsTyping] = useState(false);


    return (
        <div className="tutor">
            <Header topic={question.headerTopic} problem={`Problem ${questionId}`} />
            <div className="tutorBody">
                <div className="leftPart">
                    <ProblemMCQ statement={question.problemStatement} />
                    <CodeDisplayMCQ code={question.code} />
                    <MCQOptionsControl options={question.options} correctAnswers={question.correctAnswer} question={question} onReceiveFeedback={handleMCQFeedback} setIsTyping={setIsTyping} />
                </div>
                <div className="rightPart">
                    <ControlOutputMCQ CorrectAnswers={question.correctAnswer} studentId={studentId} moduleId={moduleId} questionId={questionId} feedbackMessage={feedbackMessage} />

                </div>
            </div>
        </div>
    );
};

export default TutorMCQControl;