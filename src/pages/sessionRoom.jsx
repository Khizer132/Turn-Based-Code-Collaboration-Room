import React, { useEffect } from 'react'
import { useState } from 'react'
import { Editor } from '@monaco-editor/react';
import { data, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const SessionRoom = () => {

    const { sessionId } = useParams();
    const navigate = useNavigate();

    const { user, isAuthentiacted } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user && !isAuthentiacted) {
            navigate("/");
        }
    }, [user, isAuthentiacted, navigate]);


    const [content, setContent] = useState('');
    const [isEnabled, setIsEnabled] = useState(true);
    const [remainingTime, setRemainingTime] = useState(30);

    useEffect(() => {
        // time interval counter 
        const interval = setInterval(() => {
            setRemainingTime(timeLeft => timeLeft - 1);
        }, 1000);

        if (remainingTime === 0) {
            clearInterval(interval)
            setIsEnabled(prevEnable => !prevEnable)
            setRemainingTime(30)
        }
        return () => clearInterval(interval);
    }, [remainingTime]);


    const onhandleChange = (value) => {
        setContent(value || '')
    }

    const onCopyToClipboard = () => {
        try {
            navigator.clipboard.writeText(sessionId);
            toast.success('Session ID copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy session ID:', error);
        }
    }

    return (
        <div className='bg-gray-600'>

            <div className='mx-auto mx-w-6xl p-4 flex flex-col gap-5 justify-center items-center'>
                <div className='flex flex-col gap-4'>
                    <p className='font-medium text-gray-700'>Share this to your friend</p>
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            className='bg-gray-200 border border-gray-300 rounded-md p-2 text-center'
                            readOnly
                            value={sessionId}
                        />
                        <button className=' bg-gray-800 text-white px-4 py-2 rounded-md' onClick={onCopyToClipboard} >📄</button>
                    </div>
                </div>
            </div>
            <div className='mx-auto mx-w-6xl p-4 flex flex-col gap-5 justify-center mb-10'>
                <h1 className='text-4xl font-bold text-center text-gray-100'>Session ID: {sessionId}</h1>
                <h3 className='text-white text-center'>{isEnabled ? `${user?.name}'s Turn` : `${user?.name}'s Turn`} - Time Remaining: {remainingTime}</h3>

                <div className='flex gap-5 justify-center'>
                    <div className='max-w-[500px] w-full border border-gray-400 rounded-4 flex flex-col gap-4'>
                        <h1 className='text-2xl font-bold text-center text-gray-100 items-center'>{user?.name}</h1>
                        <label className='text-white text-center' htmlFor="editor"> {user?.name} is Active : {isEnabled ? 'Yes' : 'No'}</label>
                        <Editor
                            id="editor"
                            className='h-[80vh]'
                            theme='vs-dark'
                            defaultLanguage="javascript"
                            defaultValue="// some comment "
                            value={content}
                            onChange={onhandleChange}
                            options={{ readOnly: !isEnabled }}
                        />
                    </div>
                    {/* <div className='max-w-[500px] w-full border border-gray-400 rounded-4 flex flex-col gap-4'>
                        <h1 className='text-2xl font-bold text-center text-gray-100'>{user?.name}</h1>
                        <label className='text-white text-center' htmlFor="editor2">Editor 2 is Active : {isEnabled ? 'No' : 'Yes'}</label> 
                        <Editor
                            id="editor2"
                            className='h-[80vh]'
                            theme='vs-dark'
                            defaultLanguage="javascript"
                            defaultValue="// some comment "
                            value={content}
                            onChange={onhandleChange}
                            options={{readOnly : isEnabled}}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default SessionRoom
