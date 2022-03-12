import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import uniqid from 'uniqid';

const AllPosts = (props) => {
    const { posts, isLoggedIn } = props;

    function PostPageConditions(props) {
        const isLoggedIn = props.isLoggedIn;

        if (isLoggedIn === true) {
            return (
                <div>
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
