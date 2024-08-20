import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft, FaImages, FaMap, FaRupeeSign} from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import {differenceInCalendarDays} from 'date-fns';
import { userContext } from '../Usercontext';

const Singleplace = () => {
    const {id}=useParams();
    const [place,setPlace]=useState([]);
    const [cin,setCin]=useState('');
    const [cout,setCout]=useState('');
    const [guest,setGuest]=useState(1);
    const [sap,setSap]=useState(false);
    const [name,setName]=useState("");
    const [number,setNumber]=useState("");
    const navigate=useNavigate();
    const {user}=useContext(userContext)
    let noOfDays=0;
    if(cin && cout){
        noOfDays=differenceInCalendarDays(new Date(cout) ,new Date(cin));
    }
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get("/places/"+id).then(res=>{
            setPlace(res.data);
        })
    },[id])

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])

    if(sap){
        return(
            <div className='sap'>
                <div className='sap1'>
                    <h2>{place.title}</h2>
                    <button onClick={()=>setSap(false)} className='sapback'><FaArrowLeft/>Go Back</button>
                    {place?.photos?.length>0 && place.photos.map(photo=>(
                        <div>
                            <img src={'http://localhost:5000/uploads/'+photo} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const bookSubmit=async(ev)=>{
        ev.preventDefault();
        const response=await axios.post("/booking",{
            cin,
            cout,
            guest,
            name,
            number,
            place:place._id,
            price: noOfDays * place.price
        })
        navigate(`/account/bookings`)
    }

  return (
    <div className='singleplace'>
        <h1>{place.title}</h1>
        
        <div className="spphotosmain">
            <div>
                <div className='spp1'>
                    {place.photos?.[0] && (
                        <img onClick={()=>setSap(true)} src={"http://localhost:5000/uploads/"+place.photos[0]}/>
                    )}
                </div>
            </div>
            <div className='spp23'>
                {place.photos?.[1] && (
                    <img onClick={()=>setSap(true)} src={"http://localhost:5000/uploads/"+place.photos[1]}/>
                )}
                {place.photos?.[2] && (
                    <img onClick={()=>setSap(true)} src={"http://localhost:5000/uploads/"+place.photos[2]}/>
                )}
            </div>
            <div className='spp45'>
            {place.photos?.[3] && (
                    <img onClick={()=>setSap(true)} src={"http://localhost:5000/uploads/"+place.photos[3]}/>
                )}
                {place.photos?.[4] && (
                    <img onClick={()=>setSap(true)} src={"http://localhost:5000/uploads/"+place.photos[4]}/>
                )}
            </div>
            <button onClick={()=>setSap(true)} className='sppo'><FaImages/> show all photos</button>
        </div>
        <h2><FaMap/>{place.address}</h2>
        <p>{place.maxGuest} Guests</p>
        <div className='desc'>
            <h2>Description</h2>
            <h4 className=''>{place.description}</h4>
        </div>
        <div className='desc'>
            <h2>Extra Information</h2>
            <h4 className=''>{place.extraInfo}</h4>
        </div>
        <div className='cio'>
            <h4>check-in: {place.checkIn}pm</h4>
            <h4>check-out: {place.checkOut}am</h4>
        </div>
        <div className='probox'>
            <h2>Price: <FaRupeeSign/><b>{place.price}</b> / night</h2>
            <div className='pbgrid'>
                <div className='cio'>
                    <label>Check In:</label>
                    <input type='date' value={cin} onChange={(e)=>{
                        setCin(e.target.value);
                    }}/>
                </div>

                <div className='cio'>
                    <label>Check Out:</label>
                    <input type='date' value={cout} onChange={ev=>{
                        setCout(ev.target.value);
                    }}/>
                </div>
                <div className='maxg'>
                    <label>Number of guests:</label>
                    <input type='number' value={guest} onChange={ev=>{
                        setGuest(ev.target.value);
                    }}/>
                </div>
            </div>
            {noOfDays >0 && (
                    <div className='nameinfo'>
                        <label>Your name is:</label>
                        <input type='text' placeholder='Enter name' value={name} onChange={ev=>{
                            setName(ev.target.value);
                        }}/>
                        <label>Your Mobile Number:</label>
                        <input type='tel' placeholder='Phone number:' value={number} onChange={ev=>{
                            setNumber(ev.target.value);
                        }}/>
                    </div>
                )}
            <button onClick={bookSubmit}>
                Book this place
                {noOfDays > 0 && (
                    <span style={{color:"white",backgroundColor:"red"}}> <FaRupeeSign style={{backgroundColor:"red",color:"white"}}/>{noOfDays*place.price}</span>
                )}
            </button>
        </div>
    </div>
  )
}

export default Singleplace