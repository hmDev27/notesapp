import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

const App = () => {
  const [backendAvailable, setBackendAvailable] = useState(true);

  useEffect(() => {
    fetch('https://e70aff8d-0c0f-4976-b5c6-cb37aa272772-00-8snas3v1xrw1.sisko.replit.dev/')  // 🔁 Replace with your actual backend URL
      .then((res) => {
        if (!res.ok) throw new Error('Backend not OK');
        setBackendAvailable(true);
      })
      .catch((err) => {
        console.error('Backend is down:', err);
        setBackendAvailable(false);
      });
  }, []);

  return (
    <div>
      {!backendAvailable && (
      <div className="bg-yellow-100 text-yellow-800 p-4 m-4 rounded text-center border border-yellow-400">
          ⚠️ Error: 503. Backend Server ကျနေသည်။ Websiteဆက်လက်အသုံးပြုနိုင်ရန် Htet-Min-Oo 0996*****37 သို့ဆက်သွယ်ပါ။ 😗
        </div>
      )}

      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};


export default App
