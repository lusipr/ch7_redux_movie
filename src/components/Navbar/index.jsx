import React from 'react';
import {
    SearchOutlined
} from '@ant-design/icons';

const Navbar = () => {
    return (
        <header className='flex flex-row justify-center py-4 fixed z-50 w-full'>
            <div className='container flex justify-between items-center'>
                <div className='flex-1'>
                    <a className='text-4xl text-red-700 font-bold' href="/">
                        Movielist
                    </a>
                </div>
                <div className='w-1/3 flex justify-center'>
                    <div className='flex border-2 border-red-600 rounded-full py-1 px-2 w-full justify-between items-center'>
                        <input className='bg-transparent flex-1 focus:outline-none' placeholder='Search Movie' />
                        <SearchOutlined />
                    </div>
                </div>
                <div className='flex-1 h-full'>
                    <nav className='flex flex-row gap-x-6 justify-end h-full'>
                        <button className='flex justify-center items-center px-8 h-full border-2 border-red-600 rounded-full text-red-600'>Login</button>
                        <button className='flex justify-center items-center px-8 h-full bg-red-600 rounded-full text-white'>Register</button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export { Navbar }