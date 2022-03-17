import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

const Aside = () => {
    return (
        <aside className='mt-24 md:ml-10 mx-auto md:fixed' aria-label='Sidebar'>
            <div className='overflow-y-auto py-4 px-3 bg-gray-50 rounded'>
                <ul className='space-y-2'>
                    <li className='w-52 md:w-26'>
                        <a
                            href='/posts/'
                            className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-300'
                        >
                            All Posts
                        </a>
                    </li>

                    <li className=''>
                        <a
                            href='/posts/new/'
                            className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-200'
                        >
                            New Post
                        </a>
                    </li>
                    <li className=''>
                        <a
                            href='#'
                            className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-200'
                        >
                            Blog Frontend
                        </a>
                    </li>
                    <li className=''>
                        <a
                            href='/'
                            className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-200'
                        >
                            Login
                        </a>
                    </li>
                    <li className=''>
                        <a
                            href='/sign-up/'
                            className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-200'
                        >
                            SignUp
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Aside;
