import { useState } from 'react'
import Navbar from './components/Navbar'
import Body from './components/Body'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <>
      <Navbar />
      {/* <Body /> */}
      <Outlet />
      <Footer />
    </>
  )
}

export default App
