// IMPORTS
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Navbar/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';

// FUNCTIONAL COMPONENT
const SignUp = () => {
  // STATE VARIABLES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  // FORM SUBMIT HANDLER
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("အမည်ဖြည့်သွင်းပါ");
      return;
    }

    if (!validateEmail(email)) {
      setError("အီးမေးလ်ဖြည့်သွင်းပါ");
      return;
    }

    if (!password) {
      setError("လျှို့ဝှက်နံပါတ်ဖြည့်သွင်းပါ");
      return;
    }

    setError('');
    
    //SignUp API Call 
    try {
      const response = await axiosInstance.post("/create-account", {
         fullName: name,
         email: email,
         password: password,
      });

      //Handle successful registration response
     if(response.data && response.data.error){
      setError(response.data.message)
      return
     } 
     if(response.data && response.data.accessToken){
      localStorage.setItem("token", response.data.accessToken)
      navigate('/dashboard')
     }
    }catch (error) {
      if(error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
    } else {
      setError("An unexpected error occured. Please try again.");
    }
  }
  };

  // RETURN
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder="အမည်"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="အီးမေးလ်"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account အကောင့်ဖွင့်ပါ
            </button>

            <p className="text-sm text-center mt-4">
              အကောင့်ရှိပြီးပါက?
              <Link to="/login" className="font-medium text-primary underline">
                Login လော့အင်ဝင်ပါ
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

//1:57