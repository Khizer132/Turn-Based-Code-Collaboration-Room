import React from 'react'

const Loader = () => {
    return (
        <div className='block mx-auto mt-[20%] w-20 h-20'>
            <div
                className="w-16 h-16 m-2 rounded-full border-[6px] border-transparent border-t-[#f59e0b] border-r-[#d97706]
                 animate-spin shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            </div>

        </div>
    )
}

export default Loader
