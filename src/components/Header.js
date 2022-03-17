import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

const Header = () => {
    return (
        <div className='w-full absolute top-0  bg-slate-500'>
            <h1 className='text-center text-2xl text-white py-6'> BLOG CMS</h1>
        </div>
    );
};

export default Header;
