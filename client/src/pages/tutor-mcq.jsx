import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/tutor.css"

import Header from "../components/header";
import ProblemMCQ from "../components/problemMCQ";
import { modules } from '../constant'
import CodeDisplayMCQ from "../components/codeDisplayMCQ";
import MCQOptions from "../components/mcqQuestion";
import BotMCQ from "../components/botMCQ";

const MCQPage = () => {
    const { moduleId, questionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [studentId, setStudentId] = useState("");

    const [botMessages, setBotMessages] = useState([
        { sender: "bot", text: "Hi! Welcome to the Java Course. Answer the question on the left. If you run into any errors, just ask. If the answer is wrong, I will try my best to guide you." },
    ]);
    const [isTyping, setIsTyping] = useState(false);

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

    const sendMessage = async (message) => {
        // Append user message to chat
        setBotMessages((prevMessages) => [...prevMessages, { sender: "user", text: message }]);

        // Simulate bot typing
        setIsTyping(true);

        try {
            // Send conversation history to ChatGPT
            const response = await fetch("http://localhost:5001/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: botMessages.concat({ sender: "user", text: message }).map((msg) => ({
                        role: msg.sender === "user" ? "user" : "assistant",
                        content: msg.text,
                    })),
                }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Append ChatGPT response to chat
            setBotMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: data.response },
            ]);
        } catch (error) {
            setBotMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Error: Could not fetch a response. Please try again." },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleMCQFeedback = async (feedbackMessage, sender) => {
        setBotMessages((prevMessages) => [...prevMessages, { sender, text: feedbackMessage }]);
        if (sender === "bot" && feedbackMessage.includes("Congratulations")) {
            console.log("Got the right answer?")
            try {
                const response = await fetch("http://localhost:5001/api/student-progress", {
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

                const refreshProgress = await fetch(`http://localhost:5001/api/student-progress/${studentId}`);
                const newProgress = await refreshProgress.json();
                console.log("Updated progress:", newProgress);
            } catch (error) {
                console.error("Error updating progress:", error);
            }
        }
    };

    const storeConversationHistory = async () => {
        if (!studentId || !moduleId || !questionId) return;

        const timestamp = new Date().toISOString(); // Timestamp as key
        const conversationData = {
            moduleId: String(moduleId), // Ensure it's stored as a string
            questionId: String(questionId),
            timestamp: timestamp,
            messages: botMessages, // Store the conversation messages
        };

        try {
            await fetch("http://localhost:5001/api/storeConversation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId, conversationData }),
            });
            console.log("Conversation history saved.");
        } catch (error) {
            console.error("Failed to store conversation history:", error);
        }
    };

    useEffect(() => {
        const handleUnload = (event) => {
            console.log(`Saving conversation history before closing...`);
            storeConversationHistory(); // Save when closing the browser/tab
        };

        window.addEventListener("beforeunload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, [botMessages]);
    return (
        <div className="tutor">
            <Header topic={question.headerTopic} problem={`Problem ${questionId}`} />

            <div className="tutorBody">
                <div className="leftPart">
                    <ProblemMCQ statement={question.problemStatement} />
                    <CodeDisplayMCQ code={question.code} />
                    <MCQOptions options={question.options} correctAnswers={question.correctAnswer} question={question} onReceiveFeedback={handleMCQFeedback} setIsTyping={setIsTyping} />
                </div>
                <div className="rightPart">
                    <BotMCQ
                        messages={botMessages}
                        isTyping={isTyping}
                        onSendMessage={sendMessage} />
                </div>
            </div>
        </div>
    );
};

export default MCQPage;
