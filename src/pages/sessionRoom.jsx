import React, { useEffect } from 'react'
import { useState } from 'react'
import { Editor } from '@monaco-editor/react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useRef } from 'react';

import { disconnectSocket } from '../lib/socket.js';
import { initializeSocket } from '../lib/socket.js';


const SessionRoom = () => {

    const { sessionId } = useParams();
    const navigate = useNavigate();

    const [socket, setSocket] = useState(null);

    const { user, isAuthentiacted } = useSelector((state) => state.auth);

    const [content, setContent] = useState('');
    const [isEnabled, setIsEnabled] = useState(true);
    const [remainingTime, setRemainingTime] = useState(30);
    const [currentTurn, setCurrentTurn] = useState(null);
    const [developer1, setDeveloper1] = useState(null);
    const [developer2, setDeveloper2] = useState(null);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);

    const timerIntervalRef = useRef(null);
    const isDeveloper1Ref = useRef(false);

    useEffect(() => {
        if (!user && !isAuthentiacted) {
            navigate("/");
            return
        }

        const socketInstance = initializeSocket();
        setSocket(socketInstance);

        socketInstance.on("connect", () => {
            console.log("Socket connected for session:", sessionId);
            // Join session after connection
            socketInstance.emit("join-session", { sessionId });
        });

        socketInstance.on("session-joined", ({ message }) => {
            toast.success(message || "Joined session successfully");
        });

        socketInstance.on("session-participants", ({ developer1, developer2 }) => {
            setDeveloper1(developer1);
            setDeveloper2(developer2);
            
            // Determine if current user is developer1 or developer2
            if (developer1 && developer1._id === user._id) {
                isDeveloper1Ref.current = true;
            } else if (developer2 && developer2._id === user._id) {
                isDeveloper1Ref.current = false;
            }
        });

        socketInstance.on("user-joined", ({ userId, userName }) => {
            toast.success(`${userName || userId} joined the session`);
        });

        socketInstance.on("user-left", ({ userId, userName }) => {
            toast.error(`${userName || userId} left the session`);
        });

        socketInstance.on("code-exchanged", ({ code }) => {
            setContent(code || '');
        });


        socketInstance.on("time-started", ({ currentTurn, dev1enabled, dev2enabled, remainingTime }) => {
            setCurrentTurn(currentTurn);
            setRemainingTime(remainingTime);
            setTimerStarted(true);

            const myTurn = isDeveloper1Ref.current ? (currentTurn === 'developer1' && dev1enabled) : (currentTurn === 'developer2' && dev2enabled);

            setIsMyTurn(myTurn);
            setIsEnabled(myTurn);
        });

        socketInstance.on("turn-switched", ({ currentTurn, dev1enabled, dev2enabled, timeRemaining }) => {
            setCurrentTurn(currentTurn);
            setRemainingTime(timeRemaining);
            
            const myTurn = isDeveloper1Ref.current ? (currentTurn === 'developer1' && dev1enabled) : (currentTurn === 'developer2' && dev2enabled);
            
            setIsMyTurn(myTurn);
            setIsEnabled(myTurn);
            
            const currentDeveloperName = currentTurn === 'developer1' ? developer1?.name : developer2?.name;
            toast.info(`${currentDeveloperName}'s turn to code`);
            
            startCountdown(timeRemaining);
        });



        socketInstance.on("session-closed", (message) => {
            toast.error(message);
            navigate("/");
        });

        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
            }
            if (socket) {
                disconnectSocket();
            }
        };
    }, [sessionId, user]);


    const startCountdown = (initialTime) => {
        // Clear existing timer
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }

        setRemainingTime(initialTime);

        // Start countdown
        timerIntervalRef.current = setInterval(() => {

            setRemainingTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerIntervalRef.current);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };


    const onhandleChange = (value) => {
        setContent(value || '')
        socket.emit("code-updated", { code: value, sessionId });
    }

    const onCopyToClipboard = () => {
        try {
            navigator.clipboard.writeText(sessionId);
            toast.success('Session ID copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy session ID:', error);
        }
    }

    const getCurrentDeveloperName = () => {
        if (!currentTurn) return "Waiting...";
        return currentTurn === 'dev1eloper1' ? developer1?.name : developer2?.name;
    }

    const getStatusMessage = () => {
        if (!timerStarted) {
            return "Waiting for both developers to join...";
        }
        if (isMyTurn) {
            return `Your Turn - Time Remaining: ${remainingTime}s`;
        }
        return `${getCurrentDeveloperName()}'s Turn - Time Remaining: ${remainingTime}s`;
    }

    return (
        <div className='bg-gray-600 min-h-screen'>

            <div className='mx-auto max-w-6xl p-4 flex flex-col gap-5 justify-center items-center'>
                <div className='flex flex-col gap-4'>
                    <p className='font-medium text-gray-200'>Share this to your friend</p>
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            className='bg-gray-200 border border-gray-300 rounded-md p-2 text-center'
                            readOnly
                            value={sessionId}
                        />
                        <button className='bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700' onClick={onCopyToClipboard}>📄</button>
                    </div>
                </div>
            </div>

            <div className='mx-auto max-w-6xl p-4 flex flex-col gap-5 justify-center mb-10'>
                <h1 className='text-4xl font-bold text-center text-gray-100'>Session ID: {sessionId}</h1>
                
                <div className='bg-gray-700 p-4 rounded-lg'>
                    <h3 className='text-white text-center text-xl font-semibold'>{getStatusMessage()}</h3>
                    {developer1 && developer2 && (
                        <div className='flex justify-center gap-4 mt-2 text-gray-300'>
                            <span>{developer1.name} {isDeveloper1Ref.current ? '(You)' : ''}</span>
                            <span>|</span>
                            <span>{developer2.name} {!isDeveloper1Ref.current ? '(You)' : ''}</span>
                        </div>
                    )}
                </div>

                <div className='flex gap-5 justify-center'>
                    <div className='max-w-[500px] w-full border border-gray-400 rounded-lg flex flex-col gap-4 bg-gray-800'>
                        <div className='p-4'>
                            <h1 className='text-2xl font-bold text-center text-gray-100'>{user?.name}</h1>
                            <label className='text-white text-center block mt-2'>
                                Status: {isEnabled && isMyTurn ? (
                                    <span className='text-green-400 font-semibold'>Active - Your Turn</span>
                                ) : (
                                    <span className='text-red-400 font-semibold'>Inactive - Waiting</span>
                                )}
                            </label>
                        </div>
                        <Editor
                            id="editor"
                            className='h-[80vh]'
                            theme='vs-dark'
                            defaultLanguage="javascript"
                            defaultValue="// Start coding when it's your turn..."
                            value={content}
                            onChange={onhandleChange}
                            options={{ 
                                readOnly: !isEnabled || !isMyTurn,
                                minimap: { enabled: false }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionRoom
