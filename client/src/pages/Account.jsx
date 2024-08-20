import React, { useContext, useState} from 'react'
import { userContext } from '../Usercontext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios';
import NewAccPage from './NewAccPage';
import BookingsPage from './BookingsPage';

const Account = () => {
    const {user,go,setUser}=useContext(userContext);
    const [redirect,setRedirect]=useState(null);

    let {subpage}=useParams();

    const logout=async()=>{
        await axios.post("/logout");
        setRedirect("/");
        setUser(null);
    }

    if(go && !user && !redirect){
        return <Navigate to={"/login"}/>
    }

    if(!go){
        return "Loading..."
    }


    if(subpage === undefined){
        subpage="profile";
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    function linkclass (type=null){
        let style={textDecoration:'none',color:'black',fontSize:'17px',padding: '10px 20px',fontWeight:'600',backgroundColor:'rgb(230, 230, 230)',borderRadius:"20px"};
        if(type===subpage){
            style={ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '25px',textDecoration:'none',fontSize:'17',fontWeight:'600' };
        }
        return style;
    }

  return (
    <div className='account'>
        <nav>
            <Link to={"/account"} style={linkclass("profile")} id='acc'>
                My Profile
            </Link>

            <Link to={"/account/bookings"} style={linkclass("bookings")}>
                My Bookings
            </Link>

            <Link to={"/account/places"} style={linkclass("places")}>
                My Accomodations
            </Link>
        </nav>
        {subpage==="profile" && (
            <div className='profpage'>
                Logged in as {user.name} ( {user.mail} )
                <button onClick={logout}>Logout</button>
            </div>
        )}
        {subpage==="places" && (
            <div>
                <NewAccPage/>
            </div>
        )}
        {subpage==="bookings" && (
            <div>
                <BookingsPage/>
            </div>
        )}
    </div>
  )
}

export default Account