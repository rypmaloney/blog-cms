import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';

const Login = (props) => {
    const { setPassword, setUsername, username, password, setLoggedIn } = props;
    const [message, setMessage] = useState('Login to your account.');
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
                setMessage(resJson.info.message);
                return;
            } else {
                setLoggedIn(true);
                setMessage('Logged in');
                console.log(resJson.token);
                localStorage.setItem('token', resJson.token);
                localStorage.setItem('isLoggedIn', true);
                navigate('/posts/');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='px-8 py-6  text-left bg-white shadow-lg'>
                <h1 className='text-3xl font-bold'>Login to the Blog</h1>
                <p className='max-w-sm'>{message}</p>
                <form onSubmit={handleSubmitLogIn}>
                    <div className='mt-4'>
                        <div>
                            <label className='block text-lg font-bold mt-2'>
                                Username:
                            </label>
                            <input
                                type='text'
                                placeholder='Username'
                                name='username'
                                onChange={(e) => setUsername(e.target.value)}
                                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600'
                            ></input>
                        </div>
                        <div>
                            <label className='block text-lg font-bold mt-2'>
                                Password:
                            </label>
                            <input
                                type='password'
                                placeholder='Password'
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600'
                            ></input>
                        </div>

                        <div className='flex items-baseline justify-between'>
                            <button className='px-6 py-2 mt-4 text-white bg-orange-800 rounded-lg hover:bg-orange-900'>
                                Login
                            </button>
                            <a
                                href='/sign-up/'
                                className='text-sm text-orange-600 hover:underline'
                            >
                                Create an account
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
