import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import uniqid from 'uniqid';

const AllPosts = (props) => {
    const { posts, isLoggedIn } = props;
    let currentLogStatus = localStorage.getItem('isLoggedIn');
    function PostPageConditions(props) {
        const isLoggedIn = props.isLoggedIn;

        if (currentLogStatus) {
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
            <PostPageConditions
                isLoggedIn={isLoggedIn}
                currentLogStatus={currentLogStatus}
            />
        </div>
    );
};

export default AllPosts;
