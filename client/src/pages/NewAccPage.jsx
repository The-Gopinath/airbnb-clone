import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NewAccPage = () => {
    const [places,setPlaces]=useState([]);
    const [ready,setReady]=useState(false);
    useEffect(()=>{
        axios.get("/user-places").then(({data})=>{
            setPlaces(data);
            setReady(true);
        })
    },[])
    
  return (
    <div className='newaccpage'>
        <div className='ppinbox'>
            <Link to={'/account/places/new'} className='pplink1'>
                <FaPlus style={{backgroundColor:"red",marginRight:"5px"}}/>
                Add new places
            </Link>
        </div>
        <div className='placemainbox'>
            {ready && places.length>0 && places.map((place)=>(
                <Link to={"/account/places/"+place._id} key={place._id} className='indbox'>
                    <div className='indimg'>
                        {place.photos.length > 0 && (
                            <img src={"http://localhost:5000/uploads/"+place.photos[0]} alt='' height="100px" width="100px"/>
                        )}
                    </div>
                    <div className='indinfo'>
                        <h3>{place.title}</h3>
                        <h4>{place.description}</h4>
                        <p>{place.address}</p>
                    </div>
                </Link>
            ))}
        </div>

    </div>
  )
}

export default NewAccPage