import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/login';
import Tutor from './pages/tutor';
import Dashboard from './pages/dashboard';
import MCQPage from './pages/tutor-mcq';
import ConsentForm from './pages/consentForm';
// import Test from './pages/test';
import TestPage from './pages/test';
import DashboardControl from './pages/dashboardControl';
import TutorControl from './pages/tutorControl';
import TutorMCQControl from './pages/tutor-mcq-control';

function App() {
  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    axios
      .get('/api') // Automatically respects the proxy setting in package.json
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error.message);
      });
  }, []);

  useEffect(() => {
    const initializeSession = async () => {
      let existingSessionId = localStorage.getItem("sessionId");
      if (!existingSessionId) {
        const res = await fetch("/api/create-session");
        const data = await res.json();
        existingSessionId = data.sessionId;
        localStorage.setItem("sessionId", existingSessionId);
      }
      setSessionId(existingSessionId); // <-- 🔴 This was missing
    };
    initializeSession();
  }, []);

  if (!sessionId) return <div>Loading...</div>;

  return (
    // <div>
    //   <LoginPage />
    // </div>

    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/dashboard" element={<DashboardControl />} />
      <Route path="/pre-test/:moduleId" element={<TestPage />} />  {/* ✅ Fix: Change hyphen to / */}
      <Route path="/post-test/:moduleId" element={<TestPage />} /> {/* ✅ Fix: Change hyphen to / */}
      <Route path="/tutor/:moduleId/:questionId" element={<Tutor />} />
      <Route path="/mcq/:moduleId/:questionId" element={<MCQPage />} />
      <Route path="/tutorControl/:moduleId/:questionId" element={<TutorControl />} />
      <Route path="/mcqControl/:moduleId/:questionId" element={<TutorMCQControl />} />
      <Route path="/consent-form" element={<ConsentForm />} />
    </Routes>
  );
}

export default App;
