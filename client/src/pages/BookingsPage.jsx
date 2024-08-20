import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {differenceInCalendarDays, format} from 'date-fns'
import { FaArrowRight,FaCalendarAlt, FaMoon, FaRupeeSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BookingsPage = () => {
    const [bookings,setBookings]=useState([]);
    useEffect(()=>{
        axios.get('/bookings').then(response=>{
            setBookings(response.data);
        }).catch(err=>{
            console.log(err);
        })
    },[])
  return (
    <div className='bookingpage'>
        {bookings.length > 0 && bookings.map(booking =>(
            <div key={booking._id} className='bookings'>
                <div className="bookingimg">
                    <img src={'http://localhost:5000/uploads/' + booking.place.photos[0]}/>
                </div>
                <div className='bookingcnt'>
                    <div><h3>{booking.place.title}</h3></div>
                    <div><FaCalendarAlt/> {format(new Date(booking.checkIn),'yyyy-mm-dd')} &rarr; <FaCalendarAlt/> {format(new Date(booking.checkOut),'yyyy-mm-dd')}</div>
                    <div>
                        <h5>{differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))} Nights <FaMoon/></h5>
                        <h3>Total price: <FaRupeeSign/>{booking.price}</h3>
                    </div>
                </div>  
            </div>
        ))}
    </div>
  )
}

export default BookingsPage