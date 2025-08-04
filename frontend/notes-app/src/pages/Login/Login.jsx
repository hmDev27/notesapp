//IMPORTS
import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import {Link, useNavigate} from 'react-router-dom'
import PasswordInput from '../../components/Navbar/Input/PasswordInput'
import {useState} from 'react'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance';



//COMPONENT DECLARATION AND STATE SETUP
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()
  

//HANDLELOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault(); 

    if (!validateEmail(email)) {
      setError("အီးမေးလ်ဖြည့်သွင်းမှုပုံစံမှားယွင်းနေသည်");
      return;
    }

    if (!password){
    setError("လျှို့ဝှက်နံပါတ်ထည့်သွင်းပါ");
    return;
    }
  setError("" );

//Login API Call
try {
    const response = await axiosInstance.post("/login", {
      email: email,
      password: password,
    });

    if (response.data && response.data.accessToken) {
      localStorage.setItem("token", response.data.accessToken)
      navigate('/dashboard')
    }
} catch (error) {
  if (error.response && error.response.data && error.response.data.message) {
    setError(error.response.data.message);
  } else {
    setError("An unexpected error occurred. Please try again.");
  }
}
};



  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>

          <input type="text" placeholder="အီးမေးလ်" className="input-box"

          value={email}
             onChange={(e) => setEmail(e.target.value)}/>

          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/> 

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

          <button type="submit" className="btn-primary">
            Login လော့အင်
          </button>

          <p className="text-sm text-center mt-4">
           အကောင့်မရှိသေးပါက? 
            <Link to="/signup" className="font-medium text-primary underline">
            အကောင့်သစ်တစ်ခုပြုလုပ်ပါ
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login

//1:52:48
