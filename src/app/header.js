import React from 'react';

const Header = () => {
    return (
        <header className='m-auto p-8'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center'>
                    <h1 className='text-2xl font-bold'>Brian</h1>
                </div>
                <div className='flex flex-row items-center'>
                    <a href='/' className='text-sm font-bold text-gray-500 hover:text-gray-600 transition duration-200 ease-in-out'>Home</a>
                    <a href='/about' className='text-sm font-bold text-gray-500 hover:text-gray-600 transition duration-200 ease-in-out ml-4'>About</a>
                    <a href='/contact' className='text-sm font-bold text-gray-500 hover:text-gray-600 transition duration-200 ease-in-out ml-4'>Contact</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
