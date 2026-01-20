import React from 'react'
import { Link } from 'react-router'
import { useCreateSessionMutation, useJoinSessionMutation } from '../redux/api/sessionApi'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import toast from 'react-hot-toast'

const SessionGenerator = () => {

    const [createSession, { isLoading }] = useCreateSessionMutation();
    const [joinSession, { isLoading: isJoining }] = useJoinSessionMutation();

    const [mode, setMode] = useState(''); 

    const [sessionId, setSessionId] = useState('');

    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user && !isAuthenticated) {
            navigate("/");
        }
    }, [user, isAuthenticated, navigate]);

    const handleCreateSession = async () => {
        try {
            const roomId = await createSession().unwrap();
            setSessionId(roomId.sessionId);
            navigate(`/session/${roomId.sessionId}`);
            toast.success('Session created successfully!');
        } catch (error) {
            console.error('Failed to create session:', error);
        }
    };
    const handleJoinSession = async () => {
        try {
            await joinSession({ sessionId }).unwrap();
            navigate(`/session/${sessionId}`);
            toast.success('Joined session successfully!');
        } catch (error) {
            toast.error('Failed to join session:', error);
        }
    };

    return (
        <>
            <div className=''>

                <div className='mx-auto mx-w-6xl p-4 flex justify-center items-center h-[80vh]'>
                    <div className='flex flex-col items-center justify-between gap-8'>

                        <h1 className='text-5xl max-[500px]:text-3xl bg-[linear-gradient(77.38deg,_#FE3B76_9.15%,_#AF29CE_49.65%,_#2931DD_90.16%)] text-transparent bg-clip-text leading-[100%] tracking-[-1px] font-bold text-center'>Turn-Based Code Collaboration Room</h1>
                        <p className='text-xl font-semibold text-slate-100'>Challenge | Innovate | Conquer</p>
                        <div className='flex gap-4 max-[350px]:flex-col'>
                            <Link to="" className='bg-[rgba(73,230,230,1)] text-gray-950 px-4 py-2 rounded-md font-semibold' onClick={handleCreateSession} disabled={isLoading}>{isLoading ? 'Creating...' : 'Create Session'}</Link>
                            <Link to="" className='bg-[rgba(73,230,230,1)] text-gray-950 px-4 py-2 rounded-md font-semibold' onClick={() => setMode("join")} disabled={isJoining}>{isJoining ? 'Joining...' : 'Join Session'}</Link>
                        </div>
                        <div className='flex'>

                            {mode === "join" && (
                                <>
                                    <div className='flex flex-col gap-4'>
                                        <p className='mx-auto  font-medium text-gray-100 '>Enter the Sesssion Id </p>
                                        <div className='flex gap-4'>
                                            <input
                                                type="text"
                                                className=' bg-gray-500/30 backdrop-blur-lg shadow-xl border border-white/20 p-2 text-gray-100 border-black rounded-md text-center'
                                                onChange={(e) => setSessionId(e.target.value)}
                                            />
                                            <button className='bg-gray-400/30 backdrop-blur-lg shadow-xl border border-white/20 text-white px-8 py-2 rounded-md font-semibold ' onClick={handleJoinSession}>Join</button>
                                        </div>
                                    </div>

                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}
export default SessionGenerator
