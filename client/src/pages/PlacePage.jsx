import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaDog, FaFileUpload, FaParking, FaPizzaSlice, FaStar, FaTrash, FaTrashAlt, FaTrashRestore, FaTv, FaVolumeUp, FaWifi } from 'react-icons/fa'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

const PlacePage = () => {
  const {id}=useParams();
  const [title,setTitle]=useState("");
  const [address,setAddress]=useState("");
  const [photolink,setPhotolink]=useState("");
  const [addedPhotos,setAddedphotos]=useState([]);
  const [desc,setDesc]=useState("");
  const [perks,setPerks]=useState([]);
  const [einfo,setEinfo]=useState("");
  const [cin,setCin]=useState("");
  const [cout,setCout]=useState("");
  const [maxg,setMaxg]=useState(1);
  const [price,setPrice]=useState(1000)
  const selected=perks;
  const [redir,setRedir]=useState(false);
  const navigate=useNavigate();

  const addPhotoByLink=async(ev)=>{
    ev.preventDefault();
    const {data:filename}=await axios.post("/uploadphoto-byLink", {link:photolink});
    setAddedphotos(prev=>{
      return [...prev,filename];
    });
    setPhotolink('');
  }

  const uploadPhoto=(ev)=>{
    ev.preventDefault();
    const files=ev.target.files;
    const data=new FormData();
    for(let i=0;i<files.length;i++){
      data.append("photo",files[i]);
    }
    axios.post("/uploads",data,{
      headers: {'Content-Type':'multipart/form-data'}
    }).then(res=>{
      const {data:filenames}=res;
      setAddedphotos(prev=>{
        return [...prev,...filenames];
      });
    })
  }

  const handleperks=(ev)=>{
    const {checked,name}=ev.target;
    if(checked){
      setPerks([...selected,name])
    }else{
      setPerks([...selected.filter(selname=>selname!==name)]);
    }
  }

  const savePlace=async(ev)=>{
    ev.preventDefault();
    const pdata={
      title,
      address,
      addedPhotos,
      desc,
      perks,
      einfo,
      cin,
      cout,
      maxg,
      price,
    }
    if(!id){
      await axios.post("/places",pdata).then(()=>{
        navigate("/account/places");
      })
    }else{
      await axios.put("/places",{id,...pdata}).then(()=>{
        navigate("/account/places");
      })
    }
    
  }

  const deletePhoto=(filename)=>{
    setAddedphotos([...addedPhotos.filter(photo=>photo!==filename)])
  }

  const coverPhoto=(filename)=>{
    const woselected=addedPhotos.filter(photos=>photos!==filename);
    const newadded=[filename,...woselected];
    setAddedphotos(newadded);
  }


  useEffect(()=>{
    if(!id){
      return;
    }
    axios.get("/places/"+id).then((res)=>{
      const {data}=res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedphotos(data.photos);
      setDesc(data.description);
      setPerks(data.perks);
      setEinfo(data.extraInfo);
      setCin(data.checkIn);
      setCout(data.checkOut);
      setMaxg(data.maxGuest);
      setPrice(data.price);
    })
  },[id])


  return (
    <div className='placepage'>

        <div className='nppnew'>
          <form onSubmit={savePlace}>
            <h2>Title</h2>
            <p>Give a short and catchy title for your new place which you want to add here.</p>
            <input 
              type='text' 
              placeholder='Title, ex: My lovely Home' 
              value={title} 
              onChange={(e)=>{
                setTitle(e.target.value)
              }}
            />
            <h2>Address</h2>
            <p>Enter the address of your new location.</p>
            <input 
              type='text' 
              placeholder='Address' 
              value={address} 
              onChange={(e)=>{
              setAddress(e.target.value)
            }}/>
            <h2>Photos</h2>
            <p>Add some images of your location. Minimum 5 atleast</p>
            <div 
              className='imglink'>
              <input type='text' 
              placeholder='Add photo through the link' 
              value={photolink} 
              onChange={(e)=>{
                setPhotolink(e.target.value);
              }}/>
              <button onClick={addPhotoByLink}>Add photo</button>
            </div>
            
            <div className='liandadd'>
              <div className='plinks'>
                {addedPhotos.length > 0 && addedPhotos.map(link=>(
                    <div className='indimg' key={link}>
                      <img src={'http://localhost:5000/uploads/'+link} alt='' width="150px" height="100px"/>
                      <FaTrashAlt className='indimgicon' onClick={()=>{deletePhoto(link)}}/>
                      <FaStar className='indimgicon1' onClick={()=>{coverPhoto(link)}}/>
                    </div>
                ))}
              </div>
              <div><label className='imgbtn' style={{marginLeft:"-30px"}}>
                { <input type='file' multiple style={{visibility:"hidden",width:"10%"}} onChange={uploadPhoto}/>}
                <div className='plusbtn'><FaFileUpload/></div>
              </label></div>
            </div>
            <h2>Description</h2>
            <p>A crisp description about the place.</p>
            <input 
              type='text' 
              placeholder='Add description' 
              value={desc} 
              onChange={(e)=>{
                setDesc(e.target.value);
            }}/>
            <h2>Perks</h2>
            <p>Select the perks which your place have </p>
            <div className='npperks'>
              <label>
                <input type='checkbox' checked={selected.includes('wifi')} name='wifi' onChange={handleperks}/>
                <FaWifi id='nppi'/>
                Wifi
              </label>
              <label>
                <input type='checkbox' checked={selected.includes('parking')} name='parking' onChange={handleperks}/>
                <FaParking id='nppi'/>
                <div>Parking</div>
              </label>
              <label>
                <input type='checkbox' checked={selected.includes('tv')} name='tv' onChange={handleperks}/>
                <FaTv id='nppi'/>
                <div>TV</div>
              </label>
              <label>
                <input type='checkbox' checked={selected.includes('food')} name='food' onChange={handleperks}/>
                <FaPizzaSlice id='nppi'/>
                <div>Food</div>
              </label>
              <label>
                <input type='checkbox' checked={selected.includes('radio')} name='radio' onChange={handleperks}/>
                <FaVolumeUp id='nppi'/>
                <div>Radio</div>
              </label>
              <label>
                <input type='checkbox' checked={selected.includes('pets')} name='pets' onChange={handleperks}/>
                <FaDog id='nppi'/>
                <div>Pets</div>
              </label>
            </div>
            <h2>Extra info</h2>
            <p>Rules,regulations etc.</p>
            <input 
              type='text' 
              placeholder='Enter extra info about your place' 
              value={einfo} 
              onChange={(e)=>{
                setEinfo(e.target.value);
            }}/>
            <h2>Check in & out Time</h2>
            <p>Add the check in time</p>
            <input 
              type='text' 
              placeholder="00:00" 
              style={{width:"20%"}} 
              value={cin} 
              onChange={(e)=>{
                setCin(e.target.value);
            }}/>
            <p style={{marginTop:'8px'}}>Add the check out time</p>
            <input 
              type='text' 
              placeholder='00:00' 
              style={{width:"20%"}} 
              value={cout} 
              onChange={(e)=>{
                setCout(e.target.value);
            }}/>
            <p style={{marginTop:'8px'}}>Maximum Guests allowed</p>
            <input 
              type='number' 
              placeholder='Max guests' 
              style={{width:"20%"}} 
              value={maxg} 
              onChange={(e)=>{
                setMaxg(e.target.value);
            }}/>
            <br/>

            <h2>Price per night</h2>
            <p>Enter the amount in INR</p>
            <input 
              type='number'
              placeholder="Enter the amount" 
              style={{width:"20%"}} 
              value={price} 
              onChange={(e)=>{
                setPrice(e.target.value);
            }}/>
            <button className='nppsave'>Save</button>
          </form>
        </div>
    </div>
  )
}

export default PlacePage