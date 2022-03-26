import { useNavigate, Link } from 'react-router-dom';

import React, { useState } from 'react';

const SignUp = (props) => {
    const { setPassword, setUsername, username, password, setLoggedIn } = props;
    const [passwordReenter, setPasswordReenter] = useState('');
    const [adminPasscode, setAdminPasscode] = useState('');
    const [message, setMessage] = useState(
        'You must have the admin passcode to create an account.'
    );
    const navigate = useNavigate();

    const handleSubmitLogIn = async (e) => {
        e.preventDefault();
        setUsername(e.target.username.value);
        setPassword(e.target.password.value);
        setPasswordReenter(e.target.passwordReenter.value);
        setAdminPasscode(e.target.passcode.value);

        try {
            let res = await fetch('http://localhost:3000/admin/sign-up/', {
                method: 'POST',
                body: JSON.stringify({
                    username: `${username}`,
                    password: `${password}`,
                    passwordReenter: `${passwordReenter}`,
                    passcode: `${adminPasscode}`,
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
            setLoggedIn(false);
            setMessage('account created');
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='px-8 py-6 mt-4 text-left bg-white shadow-lg'>
                <h1 className='text-3xl font-bold'>Create Account</h1>
                <p className='max-w-sm'>{message}</p>
                <form onSubmit={handleSubmitLogIn}>
                    <div className='mt-4'>
                        <div>
                            <label className='block text-lg font-bold '>
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
                            <label className='block text-lg font-bold'>
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
                        <div>
                            <label className='block text-lg font-bold'>
                                Reenter Password:
                            </label>
                            <input
                                type='password'
                                placeholder='Reenter password'
                                name='passwordReenter'
                                onChange={(e) =>
                                    setPasswordReenter(e.target.value)
                                }
                                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600'
                            ></input>
                        </div>
                        <div>
                            <label className='block text-lg font-bold mt-4'>
                                Admin Passcode:
                            </label>
                            <input
                                type='password'
                                placeholder='Passcode'
                                name='passcode'
                                onChange={(e) =>
                                    setAdminPasscode(e.target.value)
                                }
                                className=' px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600'
                            ></input>
                        </div>

                        <div className='flex items-baseline justify-between'>
                            <button className='px-6 py-2 mt-4 text-white bg-orange-800 rounded-lg hover:bg-orange-900'>
                                Create Account
                            </button>
                            <Link
                                className='text-sm text-orange-600 hover:underline'
                                to='/'
                            >
                                Have an account? Log in.
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
