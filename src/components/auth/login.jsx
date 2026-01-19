import React from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
import { use } from 'react';
import { useEffect } from 'react';
import { useLoginUserMutation } from '../../redux/api/authApi.js';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLazyGetMeQuery } from '../../redux/api/userApi.js';



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [getMe] = useLazyGetMeQuery();

    const navigate = useNavigate();


    const [login, { isLoading, error }] = useLoginUserMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);

    console.log("Auth state in Login component:", isAuthenticated);


    useEffect(() => {
        // redirect to home if logged in
        if (isAuthenticated) {
            navigate("/Home");
        }

        if (error) {
            toast.error(error?.data?.message || "Something went wrong!");
        }
    }, [isAuthenticated, error]);



    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Login form submitted");

        const loginData = {
            email,
            password,
        };

        try {

            const {data} = await login(loginData).unwrap()
            console.log("Login successful, response data:", data);
            toast.success("Login Successful");
            await getMe().unwrap();

        } catch (err) {
            toast.error("Login failed:", err);
        }

    }

    return (
        <div className='min-h-screen bg-black flex flex-col gap-5 mx-auto items-center justify-center'>
            <form className="max-w-md w-full flex flex-col gap-4 rounded-[16px] bg-gray-500/30 backdrop-blur-lg shadow-xl border border-white/20 mx-auto p-8"
                onSubmit={submitHandler}
            >
                <h1 className="text-2xl font-bold text-center text-[rgba(73,230,230,1)] ">Login</h1>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email_field" className="text-sm font-medium text-gray-100 ml-2">Email</label>
                    <input
                        className="rounded-[8px] border border-gray-600 px-4 py-2 bg-slate-500 text-gray-100 "
                        placeholder='Enter your email...'
                        type="email"
                        id="email_field"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password_field" className="text-sm font-medium text-gray-100 ml-2">Password</label>
                    <input
                        className="rounded-[8px] border border-gray-600 px-4 py-2 bg-slate-500 text-gray-100"
                        placeholder='Enter your password...'
                        type="password"
                        id="password_field"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className='rounded-[8px] bg-[rgba(73,230,230,1)] text-center py-2 text-white mt-2 font-bold' disabled={isLoading}>
                    {isLoading ? "Authenticationg..." : "Login"} </button>

                <div className='flex gap-1 justify-center'>
                    <p className='font-normal text-gray-100'>Dont have an account?</p>
                    <Link to="/register" className='underline bg-[rgba(73,230,230,1)] bg-clip-text text-transparent font-semibold'>Register</Link>
                </div>

            </form>
        </div>
    )
}

export default Login
