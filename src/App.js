import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [posts, setPosts] = useState([{}, {}]);

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
        <div className="App">
            <header className="App-header"></header>
            <h1>Blog CMS</h1>
            {posts.map((post) => {
                return <p>{post.title}</p>;
            })}
        </div>
    );
};

export default App;
