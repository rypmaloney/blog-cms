import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Login = (props) => {
    const { handleSubmitLogIn, message, setPassword, setUsername } = props;
    return (
        <div>
            <p>{message}</p>
            <form onSubmit={handleSubmitLogIn}>
                <label>
                    username
                    <input
                        type='text'
                        name='username'
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>
                </label>
                <label>
                    password
                    <input
                        type='text'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Login;
