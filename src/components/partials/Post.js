import Parser from 'html-react-parser';
import React, { useState, useEffect, useRef } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    Link,
} from 'react-router-dom';
const Post = (props) => {
    const { post } = props;
    const body = post.body_text;
    const [date, setDate] = useState('today');

    return (
        <div className='px-2 py-6 m-4 md:w-4/5 '>
            <div className='px-4 py-8 md:p-10 text-left bg-white shadow-lg max-w-5xl'>
                <h2 className='text-2xl font-extrabold text-amber-700'>
                    {post.title} -{' '}
                    <span className='text-slate-600 text-lg'>{post.stage}</span>
                </h2>
                <p>{new Date(post.date).toLocaleDateString()}</p>
                {post.pinned ? <p>Pinned</p> : false}
                <div
                    className='my-4'
                    dangerouslySetInnerHTML={{ __html: body }}
                ></div>

                <Link
                    className='text-lg text-orange-600 '
                    to={`/posts/${post._id}/update`}
                >
                    Edit this post
                </Link>
            </div>
        </div>
    );
};

export default Post;
