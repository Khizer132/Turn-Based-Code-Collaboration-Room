import React from 'react'
import Navbar from '../components/Navbar'
import MultiEditor from '../components/multiEditor'

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col gap-5'>
       <Navbar />
       <MultiEditor />
    </div>
  )
}

export default Home
