import React from 'react';

const Body = () => {
    return (
        <main className='h-screen overflow-auto  flex flex-col items-center justify-center -mt-20'>
            <div className='flex flex-col items-center'>
                <h1 className='text-4xl lg:text-6xl font-bold text-center'>Hi, I&apos;m Brian</h1>
                <p className='text-xl lg:text-3xl lg:pt-4 text-center'>Student at SMK Pawyatan Daha 1 Kediri.</p>
            </div>
            <div className='flex flex-row justify-center items-center mt-8'>
                <a href='/contact' className='bg-blue-500 hover:bg-blue-600 transition duration-200 ease-in-out text-white font-bold py-2 px-4 rounded-full'>Contact Me</a>
            </div>
        </main>
    );
};

export default Body;
