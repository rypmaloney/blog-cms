import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import uniqid from 'uniqid';

const AllPosts = (props) => {
    const { posts } = props;
    return (
        <div>
            {posts.map((post) => {
                return <Post post={post} key={uniqid()} />;
            })}
        </div>
    );
};

export default AllPosts;
