import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const NewPost = (props) => {
    const token = props.token;
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmitNewPost = async (e) => {
        e.preventDefault();
        setPostTitle(e.target.title);
        setPostBody(e.target.body);

        try {
            let res = await fetch('http://localhost:3000/admin/posts/new/', {
                method: 'POST',
                body: JSON.stringify({
                    title: `${postTitle}`,
                    body: `${postBody}`,
                }),
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            let resJson = await res.json();

            if (res.status !== 200) {
                setMessage('Some error occured');
                console.log(res.json());
                return;
            }
            setMessage('Post saved');
            navigate('/posts/');
            console.log(resJson);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <p>{message}</p>
            <form onSubmit={handleSubmitNewPost}>
                <label>
                    Title
                    <input
                        type='text'
                        name='title'
                        onChange={(e) => setPostTitle(e.target.value)}
                    ></input>
                </label>
                <label>
                    Body
                    <textarea
                        name='body'
                        onChange={(e) => setPostBody(e.target.value)}
                    ></textarea>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default NewPost;
