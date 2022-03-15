import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import uniqid from 'uniqid';
import Aside from './Aside';

const AllPosts = (props) => {
    const { posts, isLoggedIn } = props;

    function PostPageConditions(props) {
        const isLoggedIn = props.isLoggedIn;

        if (isLoggedIn) {
            return (
                <div className='flex md:flex-row my-16 flex-col mr-16'>
                    <Aside />
                    <div className='md:ml-80 mx-auto'></div>
                    <div className='flex flex-col items-center justify-center min-h-screen  md:w-4/5 '>
                        {posts.map((post) => {
                            return <Post post={post} key={uniqid()} />;
                        })}
                    </div>
                </div>
            );
        } else {
            return (
                <div className='min-h-screen p-14'>
                    <p>
                        Please,{' '}
                        <a className='text-orange-600' href='/log-in/'>
                            log in
                        </a>{' '}
                        to edit and create posts.
                    </p>
                </div>
            );
        }
    }

    return (
        <div>
            <div className='md:ml-80 mx-auto'></div>
            <PostPageConditions isLoggedIn={isLoggedIn} />
        </div>
    );
};

export default AllPosts;
