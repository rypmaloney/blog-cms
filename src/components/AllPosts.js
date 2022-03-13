import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import uniqid from 'uniqid';

const AllPosts = (props) => {
    const { posts, isLoggedIn } = props;

    function PostPageConditions(props) {
        const isLoggedIn = props.isLoggedIn;

        if (isLoggedIn) {
            return (
                <div className='flex flex-col items-center justify-center min-h-screen  md:w-3/5 mx-auto'>
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
            <PostPageConditions isLoggedIn={isLoggedIn} />
        </div>
    );
};

export default AllPosts;
