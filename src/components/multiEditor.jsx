import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Editor } from '@monaco-editor/react';



const MultiEditor = () => {
    const [content, setContent] = useState('');
    const [isEnabled, setIsEnabled] = useState(true);
    const [remainingTime, setRemainingTime] = useState(10);


    useEffect(() => {
        // time interval counter 
        const interval = setInterval(() => {
            console.log(`time: ${remainingTime}`)
            setRemainingTime(timeLeft => timeLeft - 1);
        }, 1000);

        if (remainingTime === 0) {
            clearInterval(interval)
            setIsEnabled(prevEnable => !prevEnable)
            console.log(`enable: ${isEnabled}`)
            setRemainingTime(10)
        }
        return () => clearInterval(interval);
    }, [remainingTime]);


    const onhandleChange = (value) => {
        setContent(value || '')
    }

    return (
        <div className='bg-gray-600'>
            <div className='mx-auto mx-w-6xl p-4 flex flex-col gap-5 justify-center'>

                <h3>Time Remaining:</h3>

                <div className='flex gap-5 justify-center'>
                    <div className='max-w-[500px] w-full border border-gray-400 rounded-4 flex flex-col gap-4'>
                        <h1 className='text-2xl font-bold text-center text-gray-100 items-center'>Developer 1</h1>

                        <label htmlFor="editor1"> Editor 1 is Active : {isEnabled ? 'Yes' : 'No'}</label>
                        <Editor
                            id="editor1"
                            className='h-[80vh]'
                            theme='vs-dark'
                            defaultLanguage="javascript"
                            defaultValue="// some comment "
                            value={content}
                            onChange={onhandleChange}
                            readOnly={isEnabled}
                        />

                    </div>
                    <div className='max-w-[500px] w-full border border-gray-400 rounded-4 flex flex-col gap-4'>
                        <h1 className='text-2xl font-bold text-center text-gray-100'>Developer 2</h1>
                        <label htmlFor="editor2">Editor 2 is Active : {isEnabled ? 'No' : 'Yes'}</label>
                        <Editor
                            id="editor2"
                            className='h-[80vh]'
                            theme='vs-dark'
                            defaultLanguage="javascript"
                            defaultValue="// some comment "
                            value={content}
                            onChange={onhandleChange}
                            readOnly={!isEnabled}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MultiEditor
