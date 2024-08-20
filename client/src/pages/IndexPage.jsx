import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaRupeeSign } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const IndexPage = () => {
  const [places,setPlaces]=useState([])
  useEffect(()=>{
    axios.get("/places").then((res)=>{
      setPlaces(res.data);
    })
  },[])
  return (
    <div className='indexpage'>
        {places.length>0 && places.map(place=>(
          <Link className='homeindbox' key={place._id} to={"/place/"+place._id}>
            <div className='homeindimg'>
              {place.photos?.[0] && (
                <img src={'http://localhost:5000/uploads/'+place.photos[0]}/>
              )}
            </div>
            <div className='indboxhead'>
              <h4>{place.address}</h4>
              <h3>{place.title}</h3>
              <h5><span><FaRupeeSign/>{place.price}</span> per night</h5>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default IndexPage