import React from 'react'
import { Link } from 'react-router'


const SessionGenerator = () => {
    return (
        <div className='min-h-screen bg-gray-100  '>

            <div className='mx-auto mx-w-6xl p-4 flex justify-center items-center h-[80vh]'>
                <div className='flex flex-col items-center justify-between gap-8'>

                    <h1 className='text-5xl bg-[linear-gradient(77.38deg,_#FE3B76_9.15%,_#AF29CE_49.65%,_#2931DD_90.16%)] text-transparent bg-clip-text leading-[100%] tracking-[-1px] font-bold'>Turn-Based Code Collaboration Room</h1>

                    <div className='flex'>
                        <Link to="" className='bg-gray-950 text-white px-4 py-2 rounded-md mr-5 font-semibold'>Create Session</Link>
                        <Link to="" className='text-gray-950 border border-gray-950 px-4 py-2 rounded-md mr-5 font-semibold'> Join Session</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionGenerator
