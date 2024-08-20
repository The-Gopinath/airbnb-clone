import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../Usercontext';

const Loginpage = () => {
    const [mail,setMail]=useState("");
    const [pswd,setPswd]=useState("");
    const [redirect,setRedirect]=useState(false)
    const {setUser}=useContext(userContext);
    const navigate=useNavigate();

    const loginUser=async(e)=>{
        e.preventDefault()
        const userInfo={
            mail:mail,
            pswd:pswd
        }
        try{
            const {data}=await axios.post("/login",userInfo)
            setUser(data);
            setRedirect(true);
        }catch(err){
            console.log(err);
        }
 
        if(redirect){
            navigate("/")
        }
    }


  return (
    <div className='register'>
        <div className='regin'>
            <h2>
                Login
            </h2>
            <form onSubmit={(e)=>{
                loginUser(e)
            }}>
                <input type='text' placeholder='your@email.com' value={mail} onChange={(e)=>{
                    setMail(e.target.value);
                }}/>
                <input type='password' placeholder='Password' value={pswd} onChange={(e)=>{
                    setPswd(e.target.value);
                }}></input>
                <button type='submit'>Login</button>
                <div className='redir'>
                    Doesn't have an account?<Link to={"/register"}>click here</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Loginpage