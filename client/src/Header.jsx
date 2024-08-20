import React, { useContext } from 'react'
import { FaAirbnb, FaBars, FaSearch, FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { userContext } from './Usercontext'

const Header = () => {
  const {user}=useContext(userContext)
  return (
    <header className='header'>
        <Link className='lan' to={"/"}>
            <FaAirbnb/>
            airbnc
        </Link>
        <div className='cen'>
            <p>Anywhere</p>
            <p>Anyweek</p>
            <p>Add guests</p>
            <FaSearch/>
        </div>
        <Link className='proficon' to={user? '/account':'/login'} >
            <FaBars id='proficonn'/>
            <FaUserCircle id='proficonn'/>
            {user && (
              <div className='profname'>
                {user.name}
              </div>
            )
            }
        </Link>
    </header>
  )
}

export default Header