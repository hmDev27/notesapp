import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

const App = () => {
  const [backendAvailable, setBackendAvailable] = useState(true);

  useEffect(() => {
    fetch('https://your-backend-url.repl.co/health')  // 🔁 Replace with your actual backend URL
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
          ⚠️ Backend Server ကျနေသည်။ Websiteဆက်လက်အသုံးပြုနိုင်ရင် Htet-Min-Oo 09965507737 သို့ဆက်သွယ်ပါ။ 😗
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
