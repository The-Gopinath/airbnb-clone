import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaLocationArrow } from 'react-icons/fa';
import { useParams } from 'react-router-dom'

const BookingPage = () => {
  const [booking,setBooking]=useState(null);
  const {id}=useParams();
  useEffect(()=>{
    if(id){
      axios.get('/bookings').then(res=>{
        const fb=res.data.find(({_id})=> _id == id);
        if(fb){
          setBooking(fb)
        }
      })
    }
  },[id]);

  if(!booking){
    return " ";
  }
  return (
    <div>
      <h2>{booking.place.title}</h2>
      <FaLocationArrow/>{booking.place.address}
    </div>
  )
}

export default BookingPage