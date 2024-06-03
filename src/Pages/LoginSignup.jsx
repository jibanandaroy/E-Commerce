import React, { useContext, useState } from 'react'
import './CSS/LoginSignup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

export const LoginSignup = () => {
  const { setUser } = useContext(ShopContext);

  const navigate = useNavigate();
  const [state, setState] = useState("Login")

  //signup
  const [confirmPass, setConfirmPass] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: 10
  })
  const [data, setData] = useState({
    email: "",
    password: ""
  });


  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setData({ ...formData, [e.target.name]: e.target.value })
    
  }


  const login = async (e) => {
    // e.preventDefault();

    const { email, password } = data; //distruct 
    try {
      const response = await axios.post('/api/auth/login', {
        email, password
      })
      setUser((prev)=>({...prev,isLogdin:true}))
      if (response.data.error) {
        alert(response.data.error);
        return;
      }
      navigate('/');

    } catch (error) {
      console.log(error);
    }
  }



  const signup = async (e) => {
    // e.preventDefault();

    const { name, email, password, role } = formData;

    if (formData.password !== confirmPass) {
      alert("Password not match");
      return;
    }

    if (!name || !email || !password) {
      return;
    }
    try {
      const response = await axios.post('/api/auth/signup', {
        name, email, password, role
      });

      if (response.data.error) {
        alert(response.data.error);
        return;
      }
      if (response.data.success) {
        setUser((prev)=>({...prev,isLogdin:true}))
        alert("check and verify your mail")
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup_container">
        <h1>{state}</h1>
        <div className="loginsignup_fields">
          {state === 'Sign Up' ? <input type="text" name='name' value={formData.name} onChange={changeHandler} placeholder='Your Name' /> : <></>}
          <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email Address' />
          <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Password' />
          {state === 'Sign Up' ? <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(() => (e.target.value))} placeholder='Comfirm Password' /> : <></>}
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up"
          ? <p className="loginsignup_login">Already have an account? <span onClick={() => { setState("Login") }}>login here</span></p>
          : <p className="loginsignup_login">Create an account <span onClick={() => { setState("Sign Up") }}>Click here</span></p>
        }


        {/* <div className="loginsignup_agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div> */}
      </div>
    </div>
  )
}
