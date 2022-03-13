import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

const Login = (props) => {
    const { setPassword, setUsername, username, password, setLoggedIn } = props;
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmitLogIn = async (e) => {
        e.preventDefault();
        setUsername(e.target.username.value);
        setPassword(e.target.password.value);

        try {
            let res = await fetch('http://localhost:3000/admin/log-in/', {
                method: 'POST',
                body: JSON.stringify({
                    username: `${username}`,
                    password: `${password}`,
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            let resJson = await res.json();

            if (res.status !== 200) {
                setMessage('Some error occured');
                console.log(res);
                return;
            }
            setLoggedIn(true);
            setMessage('Logged in');
            console.log(resJson.token);
            localStorage.setItem('token', resJson.token);
            localStorage.setItem('isLoggedIn', true);
            navigate('/posts/');
        } catch (err) {
            console.log(err);
        }
    };

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
