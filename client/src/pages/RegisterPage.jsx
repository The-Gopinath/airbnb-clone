import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [name,setName]=useState("");
    const [mail,setMail]=useState("");
    const [pswd,setPswd]=useState("");

    const registerUser=async(e)=>{
        e.preventDefault();
        const data={
            name:name,
            mail:mail,
            pswd:pswd
        }
        try{
            await axios.post("/register",data).then(()=>{
                console.log("Success");
            })
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='register'>
        <div className='regin'>
            <h2>
                Register
            </h2>
            <form onSubmit={(e)=>{
                registerUser(e)
            }}>
                <input type='text' placeholder='Enter Name' value={name} onChange={(e)=>{
                    setName(e.target.value);
                }}/>
                <input type='text' placeholder='your@email.com' value={mail} onChange={(e)=>{
                    setMail(e.target.value);
                }}/>
                <input type='password' placeholder='Password' value={pswd} onChange={(e)=>{
                    setPswd(e.target.value);
                }}></input>
                <button type='submit'>Proceed</button>
                <div className='redir'>
                    Already have an account?<Link to={"/login"}>click here</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage