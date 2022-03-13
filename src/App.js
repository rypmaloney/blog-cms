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
    const [message, setMessage] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(
        localStorage.getItem('isLoggedIn')
    );
    const [token, setToken] = useState(localStorage.getItem('token'));

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
                                    setUsername={setUsername}
                                    setPassword={setPassword}
                                    username={username}
                                    password={password}
                                    isLoggedIn={isLoggedIn}
                                    setLoggedIn={setLoggedIn}
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
                    <Route
                        path='/posts/new/'
                        element={<NewPost token={token} />}
                    />
                </Routes>
                {/* <Footer /> */}
            </BrowserRouter>
        </div>
    );
};

export default App;
