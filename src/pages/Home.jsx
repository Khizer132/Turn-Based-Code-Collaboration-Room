import React from 'react'
import Navbar from '../components/Navbar'
import MultiEditor from '../components/multiEditor'
import SessionGenerator from '../components/sessionGenerator'

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col gap-5'>
       <Navbar />
       <SessionGenerator />
       {/* <MultiEditor /> */}
    </div>
  )
}

export default Home
