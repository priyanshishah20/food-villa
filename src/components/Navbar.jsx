import React, { useState } from 'react'

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false); 

  return (
    <>
    <div className='fixed w-full flex items-center justify-between bg-[#333] text-white h-[4.375rem] px-[4rem]'>
        <div className='logo'>Food Villa</div>
        <div className='nav-items'>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Cart</li>
            </ul>
        </div>
        <div>
          {loggedIn ? <button onClick={() => setLoggedIn(false)}>Logout</button> : <button onClick={() => setLoggedIn(true)} className='login-btn'>Login</button>}
        </div>
    </div>
    </>
  )
}

export default Navbar