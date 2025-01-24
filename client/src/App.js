import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/login';
import Tutor from './pages/tutor';

function App() {
  const [message, setMessage] = useState('');

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

  return (
    // <div>
    //   <LoginPage />
    // </div>

    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Tutor />} />
    </Routes>
  );
}

export default App;
