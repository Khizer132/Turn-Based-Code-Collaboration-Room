import React from 'react'

import { Link } from 'react-router'

const Login = () => {
    return (
        <div className='min-h-screen flex flex-col gap-5 mx-auto items-center justify-center'>
            <form className="max-w-md w-full flex flex-col gap-4 rounded-[16px] border bg-gray-200 mx-auto p-8"  action="">
                <h1 class="text-2xl font-bold text-center text-gray-800 ">Login</h1>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email_field" className="text-sm font-medium text-gray-700 ml-2">Email</label>
                    <input
                        className="rounded-[8px] border border-gray-600 px-4 py-2 "
                        placeholder='Enter your email...'
                        type="email"
                        id="email_field"
                        name="email"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password_field" className="text-sm font-medium text-gray-700 ml-2">Password</label>
                    <input
                        className="rounded-[8px] border border-gray-600 px-4 py-2 "
                        placeholder='Enter ypur password...'
                        type="password"
                        id="password_field"
                        name="password"
                    />
                </div>

                <button className= 'rounded-[8px] bg-blue-600 text-center py-2 text-gray-200 mt-2 font-bold'>Login </button>

                <div className='flex gap-1 justify-center'>
                    <p className='font-normal'>Dont have an account?</p>
                    <Link to="/signup" className='underline bg-blue-600 bg-clip-text text-transparent font-semibold'>SignUp</Link>
                </div>

            </form>
        </div>
    )
}

export default Login
