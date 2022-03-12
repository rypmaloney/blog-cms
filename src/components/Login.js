import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Login = () => {
    return (
        <div>
            <form method='post' action='http://localhost:3000/log-in/'>
                <label>
                    username
                    <input type='text' name='username'></input>
                </label>
                <label>
                    password
                    <input type='text' name='password'></input>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Login;
