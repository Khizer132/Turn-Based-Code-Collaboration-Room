import React from 'react'
import { Link } from 'react-router'
import { useState } from 'react'
import { use } from 'react';
import { useEffect } from 'react';
import { useRegisterUserMutation } from '../../redux/api/authApi.js';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Register = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const navigate = useNavigate();

    const [register, { isLoading, data, error, isSuccess }] = useRegisterUserMutation();

    console.log("ragister data", data);

    useEffect(() => {

        if (error) {
            toast.error(error?.data?.message || "Something went wrong!");
        }
        if (isSuccess) {
            toast.success("Registered Successfully! Please login.");
        }
    }, [error, isSuccess]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const registerData = {
            name,
            email,
            password,
        };

        try {
            const { data } = await register(registerData).unwrap()
            console.log("Register successful, response data:", data);
            toast.success("Registered Successfully!");
            navigate("/Home");

        } catch (err) {
            toast.error("Register failed:", err);
        }
    }

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <div className='min-h-screen flex flex-col gap-5 mx-auto items-center justify-center bg-black'>
            <form className="max-w-md w-full flex flex-col gap-4 rounded-[16px] bg-gray-500/30 backdrop-blur-lg shadow-xl border border-white/20 mx-auto p-8" onSubmit={submitHandler}>
                <h1 className="text-2xl font-bold text-center text-[rgba(73,230,230,1)] ">Signup</h1>

                <div className="flex   flex-col gap-2 justify-center">
                    <label htmlFor="text_field" className="text-sm font-medium text-gray-100 ml-2">UserName</label>
                    <input
                        className="rounded-[8px] border border-gray-600 px-4 py-2 bg-slate-500 text-gray-100"
                        type="text"
                        id="name_field"
                        placeholder='Enter your name...'
                        name="name"
                        value={name}
                        onChange={onChangeHandler}
                    />
                </div>

                <div className="flex flex-col gap-2 justify-center">
                    <label htmlFor="email_field" className="text-sm font-medium text-gray-100 ml-2">Email</label>
                    <input
                        className="rounded-[8px] border border-gray-600 px-4 py-2 bg-slate-500 text-gray-100"
                        placeholder='Enter your email...'
                        type="email"
                        id="email_field"
                        name="email"
                        value={email}
                        onChange={onChangeHandler}
                    />
                </div>


                <div className="flex flex-col gap-2 justify-center">
                    <label htmlFor="password_field" className="text-sm font-medium text-gray-100 ml-2">Password</label>
                    <input
                        className="rounded-[8px] border border-gray-600 px-4 py-2 bg-slate-500 text-gray-100"
                        placeholder='Enter your password...'
                        type="password"
                        id="password_field"
                        name="password"
                        value={password}
                        onChange={onChangeHandler}
                    />
                </div>

                <button className='rounded-[8px] bg-[rgba(73,230,230,1)] text-center py-2 text-white mt-2 font-bold ' disabled={isLoading}>{isLoading ? "Registering..." : "Register"} </button>

                <div className='flex gap-1 justify-center'>
                    <p className='font-normal text-gray-100'>Already have an account?</p>
                    <Link to="/" className='underline bg-[rgba(73,230,230,1)] bg-clip-text text-transparent font-semibold'>Login</Link>
                </div>

            </form>
        </div>
    )
}

export default Register
