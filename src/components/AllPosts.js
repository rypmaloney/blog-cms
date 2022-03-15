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
                <div className='flex flex-col items-center justify-center min-h-screen  md:w-4/5 '>
                    {posts.map((post) => {
                        return <Post post={post} key={uniqid()} />;
                    })}
                </div>
            );
        } else {
            return <p>Please, log in to edit and create posts.</p>;
        }
    }

    return (
        <div>
            <div className='flex md:flex-row my-16 flex-col mr-16'>
                <Aside />
                <div className='md:ml-80 mx-auto'></div>
                <PostPageConditions isLoggedIn={isLoggedIn} />
            </div>
        </div>
    );
};

export default AllPosts;
