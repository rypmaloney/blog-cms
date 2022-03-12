import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const AllPosts = (props) => {
    const { posts } = props;
    return (
        <div>
            {posts.map((post) => {
                return <p>{post.title}</p>;
            })}
        </div>
    );
};

export default AllPosts;
