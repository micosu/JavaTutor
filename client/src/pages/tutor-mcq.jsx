// Tutor page for MCQ Questions for test students

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

    const question = module ? module.questions.find(q => q.questionId === Number(questionId)) : null;

    useEffect(() => {
        if (!question) {
            console.error("Question not found");
            navigate("/home");
        }
    }, [question, navigate]);

    const sendMessage = async (message) => {
        setIsTyping(true);
        const sessionId = localStorage.getItem("sessionId");
        const timestamp = new Date().toISOString();
        const studentGroup = sessionStorage.getItem("studentGroup");

        // Storing the message in the userInteractions collection
        await fetch(`${BASE_URL}/api/log-interaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sessionId,
                studentId,
                moduleId,     // make sure this is accessible via props/context
                questionId,
                eventType: "user-message",
                message,
                timestamp,
                studentGroup
            }),
        });
        // Logic for checking student questions to avoid gaming goes here
        const checkQuestion = async (message) => {
            try {

                const response = await fetch(`${BASE_URL}/api/check-question`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ question: message }),
                });

                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`);
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                // Student is asking for the answer
                if (data.answer.includes("Yes")) {
                    console.log("Student asking for full answer")
                    return false
                } else {
                    // Student is not asking for the answer
                    console.log("Good student")
                    return true
                }
            } catch (error) {
                console.log("Error checking student question:", error);
                return false;
            }
        }

        const isGoodStudent = await checkQuestion(message);

        if (isGoodStudent) {
            const updatedMessages = [...botMessages, { sender: "user", text: message }];
            setBotMessages(updatedMessages);

            const payload = {
                messages: updatedMessages.map((msg) => ({
                    role: msg.sender === "user" ? "user" : "assistant",
                    content: msg.text,
                })),
            };

            // In case the api takes a long time, we try a max of 3 times
            const maxRetries = 3;

            const fetchWithRetry = async (retries, delay) => {
                try {
                    const response = await fetch(`${BASE_URL}/api/chat`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });

                    if (!response.ok) {
                        throw new Error(`Status: ${response.status}`);
                    }

                    const data = await response.json();

                    if (data.error) {
                        throw new Error(data.error);
                    }

                    setBotMessages((prevMessages) => [
                        ...prevMessages,
                        { sender: "bot", text: data.response },
                    ]);
                    // Store in userInteractions collection
                    await fetch(`${BASE_URL}/api/log-interaction`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            sessionId,
                            studentId,
                            moduleId,
                            questionId,
                            eventType: "bot-message",
                            message: data.response,
                            timestamp: new Date().toISOString(),
                            studentGroup
                        }),
                    });
                } catch (error) {
                    console.error(`Attempt failed (${maxRetries - retries + 1}):`, error);
                    if (retries > 1) {
                        await new Promise((res) => setTimeout(res, delay));
                        return fetchWithRetry(retries - 1, delay * 2); // exponential backoff
                    } else {
                        setBotMessages((prevMessages) => [
                            ...prevMessages,
                            {
                                sender: "bot",
                                text: "Error: Could not fetch a response. Please try again.",
                            },
                        ]);
                        // Store failure in userInteractions collection
                        await fetch(`${BASE_URL}/api/log-interaction`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                sessionId,
                                studentId,
                                moduleId,
                                questionId,
                                eventType: "bot-message",
                                message: "Error: Could not fetch a response. Please try again.",
                                timestamp: new Date().toISOString(),
                                studentGroup
                            }),
                        });
                    }
                } finally {
                    setIsTyping(false);
                }
            };

            await fetchWithRetry(maxRetries, 1000); // start with 1s delay
        }
        else {
            setBotMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Sorry we detected that you are requesting the answer directly. Please try again." },
            ]);
            // Store gaming tutor evidence in userInteractions collection
            await fetch(`${BASE_URL}/api/log-interaction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sessionId,
                    studentId,
                    moduleId,
                    questionId,
                    eventType: "bot-message",
                    message: "Sorry we detected that you are requesting the answer directly. Please try again.",
                    timestamp: new Date().toISOString(),
                    studentGroup
                }),
            });

            setIsTyping(false);
        }
    };


    // Handling the mcq answer selection
    const handleMCQFeedback = async (feedbackMessage, sender) => {
        setBotMessages((prevMessages) => [...prevMessages, { sender, text: feedbackMessage }]);
        if (sender === "bot" && feedbackMessage.includes("Congratulations")) {

            try {
                // Check the progress
                const response = await fetch(`${BASE_URL}/api/student-progress`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ studentId, moduleId, questionId, isChecked: true })
                });
                if (!response.ok) {
                    throw new Error("Failed to update progress");
                }

                const refreshProgress = await fetch(`${BASE_URL}/api/student-progress/${studentId}`);
                const newProgress = await refreshProgress.json();
               
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
           
            // First try `fetch()`
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
            });

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

    // When student clicks the done button
    const handleDoneClick = async () => {
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
                    <MCQOptions options={question.options} correctAnswers={question.correctAnswer} question={question} onReceiveFeedback={handleMCQFeedback} setIsTyping={setIsTyping} studentId={studentId} moduleId={moduleId} questionId={questionId} />
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
