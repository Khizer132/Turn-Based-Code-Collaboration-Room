import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className='bg-gray-600 '>
        <div className='mx-auto mx-w-6xl p-4'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col ml-4'>
                    <h1 className='text-3xl font-bold text-gray-100'>Relay Code</h1>
                    <p className='text-md font-normal text-gray-100'>Create probs for ur coding buddy ...</p>
                </div>
                
                <Link to='/' className='bg-blue-600 text-white px-4 py-2 rounded-md mr-5 '> Login</Link>
            </div>
        </div>
    </header>
  )
}

export default Navbar
