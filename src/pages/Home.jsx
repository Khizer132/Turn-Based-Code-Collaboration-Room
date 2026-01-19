import React from 'react'
import Navbar from '../components/Navbar'

import SessionGenerator from '../components/sessionGenerator'

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col bg-black'>
       <Navbar />
       <SessionGenerator />
    </div>
  )
}

export default Home
