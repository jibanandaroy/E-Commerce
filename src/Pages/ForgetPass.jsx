import axios from "axios";
import { useState } from "react"
import './CSS/ForgetPass.css'


export const ForgetPass = () => {
    const [data, setData] = useState({
        email:''
    });

    const changeHandler = (e) => {
       
        setData({ ...data, email: e.target.value })
        
      }
      const ForgetPassword = async () =>{
          try{
         
              const res = await axios.post('/forgot-password',data)

              if(res.data.error){
                alert(res.data.error);
                return
              }
              alert(res.data.msg)
      
          }catch(error){
            if(!error.response.success && error.response.status === 400){
                alert(error.response.data.msg)
            }
            
          }
        }

    return (
        <>
        <div className="container">
            <p>Please Enter your Email Address: </p>
            <input required type="email" name="Email" placeholder="Email"  onChange={changeHandler}/>
            <button onClick={ForgetPassword}>submit</button>
        </div>
        </>
    )
}
