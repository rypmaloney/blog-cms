import './App.css';

import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllPosts from './components/AllPosts';
import Login from './components/Login';
import NewPost from './components/NewPost';
import SignUp from './components/SignUp';
import PostUpdate from './components/PostUpdate';
import Aside from './components/Aside';
import Header from './components/Header';

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
                    console.log(res.status);
                } else {
                    const posts = await res.json();
                    setPosts(posts);
                    console.log(posts);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getPosts();
    }, [message]);

    return (
        <div className='bg-gray-200'>
            <Header />

            <div className='flex md:flex-row my-16 flex-col mr-16'>
                <Aside />
                <div className='md:ml-80 mx-auto'>
                    <BrowserRouter>
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
                                exact
                                path='/sign-up/'
                                element={
                                    <SignUp
                                        setUsername={setUsername}
                                        setPassword={setPassword}
                                        username={username}
                                        password={password}
                                        isLoggedIn={isLoggedIn}
                                        setLoggedIn={setLoggedIn}
                                    />
                                }
                            />
                            <Route
                                path='/posts/'
                                element={
                                    <AllPosts
                                        posts={posts}
                                        isLoggedIn={isLoggedIn}
                                    />
                                }
                            />
                            <Route
                                path='/posts/new/'
                                element={<NewPost token={token} />}
                            />

                            <Route
                                path='/posts/:id/update/'
                                element={
                                    <PostUpdate posts={posts} token={token} />
                                }
                            ></Route>
                        </Routes>
                        {/* <Footer /> */}
                    </BrowserRouter>
                </div>
            </div>
        </div>
    );
};

export default App;
