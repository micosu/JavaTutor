import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../assets/css/tutor.css"

import Header from "../components/header";
import ProblemMCQ from "../components/problemMCQ";
import { modules } from '../constant'
import CodeDisplayMCQ from "../components/codeDisplayMCQ";
import MCQOptions from "../components/mcqQuestion";
import BotMCQ from "../components/botMCQ";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";
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
        setIsTyping(true);
        // Append user message to chat
        const updatedMessages = [...botMessages, { sender: "user", text: message }];
        setBotMessages(updatedMessages);


        try {
            console.log("Payload being sent to /api/chat:", updatedMessages);
            // Send conversation history to ChatGPT
            const response = await fetch(`${BASE_URL}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: updatedMessages.map((msg) => ({
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
            console.error("❌ Error in Chat API:", error);
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

    const [saving, setSaving] = useState(false);
    const storeConversationHistory = async () => {
        if (!studentId || !moduleId || !questionId) return;

        setSaving(true); // Show "Saving conversation..." message

        const timestamp = new Date().toISOString();
        const conversationData = {
            moduleId: String(moduleId),
            questionId: String(questionId),
            timestamp: timestamp,
            messages: botMessages,
        };

        const url = `${BASE_URL}/api/storeConversation`;
        const data = JSON.stringify({ studentId, conversationData });

        try {
            console.log("🚀 Saving conversation...");

            // First try `fetch()`
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
            });

            console.log("✅ API Response:", response.status);

            if (!response.ok) {
                throw new Error(`API failed with status ${response.status}`);
            }

            // Save student progress
            await fetch(`${BASE_URL}/api/student-progress`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId, moduleId, questionId, isChecked: true }),
            });

            console.log("✅ Progress saved successfully!");

        } catch (error) {
            console.error("❌ Error saving conversation or progress:", error);
        }

        setSaving(false);
    };



    useEffect(() => {
        const handleUnload = async (event) => {
            console.log("⚠️ Tab is attempting to close... Delaying closure by 5 seconds.");

            setSaving(true); // Show saving message in UI

            // Delay the tab close for 5 seconds
            await new Promise(resolve => setTimeout(resolve, 5000));

            await storeConversationHistory(); // Save conversation

            console.log("✅ Conversation saved. Closing tab...");
            setSaving(false); // Hide message

            // Attempt to close the tab automatically (works only for self-opened tabs)
            window.open("about:blank", "_self").close();
        };

        window.addEventListener("beforeunload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, [botMessages]);

    const handleDoneClick = async () => {
        console.log("✅ Done button clicked, saving progress and conversation...");

        // Save conversation history
        await storeConversationHistory();

        // Notify student
        setBotMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: "✅ Your progress has been saved! You can proceed to the next question by closing this tab." },
        ]);
    };

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
                        onSendMessage={sendMessage}
                        onDone={handleDoneClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default MCQPage;
