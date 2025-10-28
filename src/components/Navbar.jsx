import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false); 

  return (
    <>
    <div className='fixed w-full flex items-center justify-between bg-[#333] text-white h-[4.375rem] px-[4rem]'>
        <div className='logo'>Food Villa</div>
        <div className='nav-items'>
            <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to="/about"><li>About Us</li></Link>
                <Link to='/contact'><li>Contact</li></Link>
                <Link to='/cart'><li>Cart</li></Link>
            </ul>
        </div>
        <div>
          {loggedIn ? <button onClick={() => setLoggedIn(false)} className='login-btn'>Logout</button> : <button onClick={() => setLoggedIn(true)} className='login-btn'>Login</button>}
        </div>
    </div>
    </>
  )
}

export default Navbar