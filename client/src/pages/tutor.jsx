// Tutor page for test students
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import '../assets/css/tutor.css'

import Header from '../components/header'
import Problem from '../components/problem'
import Bot from '../components/bot'
import Editor from '../components/editor'
import Output from '../components/output'
import { modules } from '../constant'
import logo from '../assets/images/Logo.svg'

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";

const Tutor = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { moduleId, questionId } = useParams();
    const queryParams = new URLSearchParams(location.search);
    let studentId = queryParams.get("studentId") || sessionStorage.getItem("studentId");

    const [hasAttempted, setHasAttempted] = useState(false);

    useEffect(() => {
        if (!studentId) {
            navigate("/"); // ✅ Redirect to login if not logged in
        } else {
            sessionStorage.setItem("studentId", studentId); // ✅ Store in session
        }
    }, [navigate, studentId]);

    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false); // Track loading state
    const [botMessages, setBotMessages] = useState([
        { sender: "bot", text: "Hi! Welcome to the Java Course. I'm here to help if you get stuck.  But before you can ask for help, give the problem on the right a try!" },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    // Finding the matching module and question based on moduleId and questionId
    const module = modules.find(m => m.moduleId === Number(moduleId));
    const question = module ? module.questions.find(q => q.questionId === Number(questionId)) : null;

    useEffect(() => {
        if (!question) {
            console.error("Question not found");
            navigate("/home");
        }
    }, [question, navigate]);

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
            setSaving(false); // Hide message

            // Attempt to close the tab automatically (works only for self-opened tabs)
            window.open("about:blank", "_self").close();
        };

        window.addEventListener("beforeunload", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, [botMessages]);




    // Cleaning code to remove extra whitespaces
    const sanitizeCode = (code) => {
        return code
            .replace(/\u00A0/g, " ") // Replace non-breaking spaces with normal spaces
            .replace(/\t/g, "    ") // Replace tabs with spaces
            .trim(); // Remove leading and trailing whitespace
    };

    // Running code
    const runCode = async (code) => {
        setHasAttempted(true)
        const sanitizedCode = sanitizeCode(code);
        const url = `${BASE_URL}/api/execute`;

        // JDoodle Requested Format
        const requestBody = {
            clientId: "19f502d67b809bb3491c24a025bcef54", // Replace with your actual Client ID
            clientSecret: "20b8c7fc700ea1e56ee3076675ca8bda7192ebd799aa5101a620728c27d30dd6", // Replace with your actual Client Secret
            script: sanitizedCode, // The Java code you want to execute
            stdin: "",
            language: "java",
            versionIndex: "4", // Use the appropriate versionIndex for Java
            compileOnly: false, // Set this to true if you only want to compile the code
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data; // Returns the response, which includes the output
        } catch (error) {
            console.error("Error executing code:", error);
            return { error: error.message };
        }
    };

    // Pressing run
    const handleRunCode = async (code, isCorrect) => {
        setLoading(true); // Start loading
        const result = await runCode(code); // Call the JDoodle API
        setLoading(false); // End loading

        if (result.error) {
            setOutput(`Error: ${result.error}`);

        } else {
            setOutput(result.output); // Display the output
            if (isCorrect) {
                setBotMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "bot", text: "Congratulations, you got the right answer and can move on! Press Done to store your progress." },
                ]);

                // If correct save progress
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
            } else {
                setBotMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "bot", text: "Your code has some issues. Let me help you debug step by step." },
                ]);
            }
        }
    };

    // Chatting with Bot
    const sendMessage = async (message) => {
        setIsTyping(true);
        const sessionId = localStorage.getItem("sessionId");
        const timestamp = new Date().toISOString();
        const studentGroup = sessionStorage.getItem("studentGroup");

        // Storing the message in userInteractions
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
        if (!hasAttempted) {
            alert("Attempt the problem before you ask for help!");
            setIsTyping(false);
            return;
        } 
        // Checking if student is asking for full answer
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
            
                    return false
                } else { // Student is not asking for answer
                    
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

            // In case API times out, we retry max of 3 times
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
                        // Storing error in user interactions collection
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
            // Storing student gaming the tutor in user interactions collection
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

    if (!question) return null;


    // Handle Done button click
    const handleDoneClick = async () => {
       
        // Save conversation history
        await storeConversationHistory();

        // Notify student
        setBotMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: "✅ Progress saved! You can proceed to the next question by closing this tab." },
        ]);
    };

    return (
        <div className="tutor">
            <Header topic={question.headerTopic} problem={`Problem ${questionId}`} />
            {saving && <div className="saving-message">💾 Saving your conversation... Please wait.</div>}
            <div className="topPart">
                <Problem statement={question.problemStatement}
                    input={question.input}
                    output={question.output} />
                <Editor
                    onRunCode={handleRunCode}
                    setBotMessages={setBotMessages}
                    setIsTyping={setIsTyping}
                    initialCode={question.code}
                    problemStatement={question.problemStatement}
                    initialCorrectAnswers={question.correctAnswers}
                    moduleId={moduleId}
                    questionId={questionId}
                    studentId={studentId}
                />
            </div>
            <div className="bottomPart">
                <Bot
                    messages={botMessages}
                    isTyping={isTyping}
                    onSendMessage={sendMessage}
                    onDone={handleDoneClick}
                />
                <Output output={output} loading={loading} />
            </div>
        </div>
    )
}

export default Tutor