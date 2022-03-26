import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import Aside from '../partials/Aside';
import MCEeditor from '../partials/Editor';

const NewPost = (props) => {
    const { token, getPosts } = props;
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const editorRef = useRef(null);

    const log = () => {
        if (editorRef.current) {
            setPostBody(editorRef.current.getContent());
        }
    };
    const handleSubmitNewPost = async (e) => {
        e.preventDefault();
        log();
        try {
            let res = await fetch(
                'https://obscure-wildwood-18149.herokuapp.com/admin/posts/new/',
                {
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
                }
            );
            let resJson = await res.json();
            //Handle errors
            if (res.status !== 200) {
                let errors = '';
                resJson.errors.forEach((error) => {
                    if (error.msg) {
                        errors += `${error.msg} `;
                    }
                });
                setMessage(errors);
                return;
            }
            //Save post
            getPosts();
            navigate('/posts/');
        } catch (err) {
            setMessage('There seems to be problem submitting that.');
            console.log(err);
        }
    };

    return (
        ////////
        <div className=''>
            <Aside />

            <div className='flex items-center justify-center min-h-screen  md:ml-64 mx-auto'>
                <div className='px-8 py-4 text-left bg-white shadow-lg w-4/5 max-w-6xl md:min-h-screen mt-16 pb-0 '>
                    <h1 className='text-3xl font-bold'>
                        Write a New Blog Post
                    </h1>
                    <p className='max-w-md'>{message}</p>

                    <form onSubmit={handleSubmitNewPost} className='pb-5'>
                        <div className='my-4'>
                            <div>
                                <label className='block text-lg font-bold mt-2'>
                                    Post Title:
                                </label>
                                <input
                                    type='text'
                                    placeholder='title'
                                    name='title'
                                    onChange={(e) =>
                                        setPostTitle(e.target.value)
                                    }
                                    className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600'
                                ></input>
                            </div>
                        </div>

                        <MCEeditor
                            initialValue='Write your message here.'
                            editorRef={editorRef}
                        />
                        <button
                            className='px-6 py-2 mt-4 text-white bg-orange-800 rounded-lg hover:bg-orange-900'
                            type='submit'
                            onClick={log}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewPost;
