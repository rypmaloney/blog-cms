import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useNavigate,
} from 'react-router-dom';
import Aside from './Aside';

const PostUpdate = (props) => {
    let { id } = useParams();
    const { posts, setPosts, getPosts } = props;
    const [currentPost, setCurrentPost] = useState({});
    const token = props.token;
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [message, setMessage] = useState('');
    const [postStage, setPostStage] = useState('draft');
    const navigate = useNavigate();
    const editorRef = useRef(null);

    useEffect(() => {
        //IF there are posts pulled from the async function in App.js
        // this accounts for the time it takes for the async function to be resolved
        if (posts === false) {
            //There are no posts so something has gone wrong
            setMessage("I'm haiving trouble fetching posts...");
        } else {
            //set the initial message and find/set the relevant post
            setMessage('Edit and save.');
            //Need the extra step of defining thisPost variable -- setState is async
            const thisPost = posts.find((post) => post._id == id);
            setCurrentPost(thisPost);
            setPostStage(thisPost.stage);
            setPostTitle(thisPost.title);
        }
        //Post is a dependency so the relevant post info is set after the fetch completes
    }, [posts]);

    //Pulls the content from the TinyMCE editor and saves it in state before submitting to API
    const log = () => {
        if (editorRef.current) {
            setPostBody(editorRef.current.getContent());
        }
    };
    const handleDeletePost = async () => {
        try {
            let res = await fetch(
                `http://localhost:3000/admin/posts/${id}/delete`,
                {
                    method: 'DELETE',
                    headers: {
                        //share logged in JWT token in header
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (res.status !== 200) {
                setMessage('Something has gone wrong.' + res.status);
                return;
            }

            let resJson = await res.json();
            //Call getPosts to refetch with new info saved
            getPosts();
            //send back to all posts
            navigate('/posts/');
            alert('Post deleted');
            console.log(resJson);
        } catch (err) {
            setMessage(
                'There seems to be a problem posting that information. Are you filled out everything correctly?'
            );
            console.log(err);
        }
    };

    //Post function to update specific post
    const handleUpdatePost = async (e) => {
        e.preventDefault();
        log();
        setPostStage(e.target.stage.value);
        //console.log(e.target.stage.value, postStage, currentPost.stage);
        setPostTitle(e.target.title.value);
        try {
            let res = await fetch(
                `http://localhost:3000/admin/posts/${id}/update`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        title: `${postTitle}`,
                        body: `${postBody}`,
                        stage: `${postStage}`,
                    }),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            let resJson = await res.json();

            if (res.status !== 200) {
                // setMessage(resJson);
                return;
            }
            setMessage('Post saved');
            //Call getPosts to refetch with new info saved
            getPosts();
            navigate('/posts/');

            console.log(resJson);
        } catch (err) {
            setMessage(
                'There seems to be a problem posting that information. Are you filled out everything correctly?'
            );
            console.log(err);
        }
    };

    return (
        <div className=''>
            <Aside />
            {}
            <div className='flex items-center justify-center min-h-screen my-20 md:ml-64 mx-auto'>
                <div className='px-8 py-6  text-left bg-white shadow-lg  w-4/5 max-w-6xl md:min-h-screen mt-16 pb-0 '>
                    <h1 className='text-3xl font-bold'>Update</h1>
                    <p className='max-w-md'>{message}</p>
                    <form onSubmit={handleUpdatePost}>
                        <div className='my-4'>
                            <div>
                                <label className='block text-lg font-bold mt-2'>
                                    Post stage:
                                </label>
                                <div className='mb-3 xl:w-96'>
                                    <select
                                        onChange={(e) => {
                                            setPostStage(e.target.value);
                                        }}
                                        value={postStage}
                                        className=' block w-24 px-3  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0'
                                        aria-label='Default select draft'
                                        name='stage'
                                    >
                                        <option value='live'>live</option>
                                        <option value='draft'>draft</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className='block text-lg font-bold mt-2'>
                                    Post Title:
                                </label>
                                <input
                                    type='text'
                                    name='title'
                                    defaultValue={currentPost.title}
                                    onChange={(e) => {
                                        setPostTitle(e.target.value);
                                    }}
                                    className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600'
                                ></input>
                            </div>
                        </div>

                        <Editor
                            apiKey={
                                '4sotskl0ipae1fkhidjiczer00626csy54r5wcsptf8udmdb'
                            }
                            onInit={(evt, editor) =>
                                (editorRef.current = editor)
                            }
                            initialValue={currentPost.body_text}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount',
                                ],
                                toolbar:
                                    'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style:
                                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}
                        />
                        <div className='flex flex-row justify-between'>
                            <button
                                className='px-6 py-2 mt-4 text-white bg-green-800 rounded-lg hover:bg-orange-900 mr-auto'
                                type='submit'
                                onClick={log}
                            >
                                Submit
                            </button>
                            <button
                                className='px-6 py-2 mt-4 text-white bg-orange-800 rounded-lg hover:bg-orange-900 ml-auto'
                                type='submit'
                                onClick={handleDeletePost}
                            >
                                Delete post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostUpdate;
