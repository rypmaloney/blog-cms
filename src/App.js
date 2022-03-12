import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllPosts from './components/AllPosts';
import Login from './components/Login';
import NewPost from './components/NewPost';

const App = () => {
    const [posts, setPosts] = useState([{}, {}]);

    //Login stuff
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(
        localStorage.getItem('isLoggedIn')
    );
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [message, setMessage] = useState('');

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
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await fetch('http://localhost:3000/admin/posts');
                if (res.status !== 200) {
                }
                const posts = await res.json();
                setPosts(posts);
                console.log(posts);
            } catch (err) {}
        };
        getPosts();
    }, []);

    return (
        <div>
            <BrowserRouter>
                {/* <Header count={cartCount} /> */}
                <Routes>
                    {
                        <Route
                            exact
                            path='/'
                            element={
                                <Login
                                    handleSubmitLogIn={handleSubmitLogIn}
                                    message={message}
                                    setUsername={setUsername}
                                    setPassword={setPassword}
                                />
                            }
                        />
                    }
                    <Route
                        path='/posts/'
                        element={
                            <AllPosts posts={posts} isLoggedIn={isLoggedIn} />
                        }
                    />
                    <Route path='/posts/new/' element={<NewPost />} />
                </Routes>
                {/* <Footer /> */}
            </BrowserRouter>
        </div>
    );
};

export default App;
