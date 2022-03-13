import Parser from 'html-react-parser';
import React, { useState, useEffect, useRef } from 'react';
const Post = (props) => {
    const { post } = props;
    const body = post.body_text;
    const [date, setDate] = useState('today');

    return (
        <div className='px-2 py-6 m-4'>
            <div className='px-4 py-8 md:p-10 text-left bg-white shadow-lg md:w-4/5 min-w-full'>
                <h2 className='text-2xl font-extrabold text-amber-700'>
                    {post.title} -{' '}
                    <span className='text-slate-600 text-lg'>{post.stage}</span>
                </h2>
                <p>{new Date(post.date).toLocaleDateString()}</p>
                <div
                    className='my-4'
                    dangerouslySetInnerHTML={{ __html: body }}
                ></div>
                <a
                    className='text-lg text-orange-600 '
                    href={`/posts/${post._id}/update`}
                >
                    Edit this post
                </a>
            </div>
        </div>
    );
};

export default Post;
