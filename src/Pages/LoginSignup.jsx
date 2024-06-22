import React, { useContext, useState } from 'react'
import './CSS/LoginSignup.css'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'


export const LoginSignup = () => {
  const { setUser,setToken,user } = useContext(ShopContext);
  

  const navigate = useNavigate();
  const [state, setState] = useState("Login")

  //signup
  const [confirmPass, setConfirmPass] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: 10,
  })
  const [data, setData] = useState({
    email: "",
    password: "",
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
      
      if(response.data.error) {
        alert(response.data.error);
        return;
      }
      if(response.data.success){
        setUser((prev)=>({...prev,isLogdin:true}))
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
       
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
        alert("Please Ckeck your mail & verify")
      }
      setState("Login")
    } catch (error) {
      console.log(error);
    }

  }

  // const ForgetPassword = async () =>{
  //   try{
  //       await axios.post('/forgot-password',{email:user.email})

  //   }catch(error){
  //     console.log(error);
  //   }
  // }
  const handleClick = () =>{
    navigate('/forgetpass')
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup_container">
        <h1>{state}</h1>
        <div className="loginsignup_fields">
          {state === 'Sign Up' ? <input type="text" name='name' value={formData.name} onChange={changeHandler} placeholder='Your Name' /> : <></>}
          {state==='Sign Up'?<hr />:<></>}
          <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email Address' />
          <hr />
          <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Password' />
          <hr />
          {state === 'Sign Up' ? <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(() => (e.target.value))} placeholder='Comfirm Password' /> : <></>}
          {state==='Sign Up'?<hr />:<></>}
          {state === 'Login' ? <button className='forget_btn' onClick={handleClick}>forget password</button> : <></>}
          
        </div>
        <button className='login_btn' onClick={() => { state === "Login" ? login() : signup() }}>{state==='Sign Up'?<span>Sign Up</span>:<span>Login</span>}</button>
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
