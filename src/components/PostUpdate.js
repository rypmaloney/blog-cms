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

const PostUpdate = (props) => {
    let { id } = useParams();
    const posts = props.posts;
    const [currentPost, setCurrentPost] = useState({ title: '' });
    const token = props.token;
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const editorRef = useRef(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await fetch('http://localhost:3000/admin/posts');
                if (res.status !== 200) {
                }
                const posts = await res.json();
                setCurrentPost(posts.find((post) => post._id == id));
            } catch (err) {}
        };
        getPosts();
    }, []);

    const log = () => {
        if (editorRef.current) {
            setPostBody(editorRef.current.getContent());
        }
    };

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        log();

        setPostTitle(e.target.title);

        try {
            let res = await fetch(
                `http://localhost:3000/admin/posts/${id}/update`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        title: `${postTitle}`,
                        body: `${postBody}`,
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
                setMessage('Some error occured');
                console.log(res.json());
                return;
            }
            setMessage('Post saved');
            navigate('/posts/');
            console.log(resJson);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='px-8 py-6 mt-4 text-left bg-white shadow-lg'>
                <h1 className='text-3xl font-bold'>Update</h1>
                <p className='max-w-md'>{message}</p>
                <form onSubmit={handleUpdatePost}>
                    <div className='my-4'>
                        <div>
                            <label className='block text-lg font-bold mt-2'>
                                Post Title:
                            </label>
                            <input
                                type='text'
                                name='title'
                                // defaultValue={currentPost.title}
                                onChange={(e) => setPostTitle(e.target.value)}
                                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600'
                            ></input>
                        </div>
                    </div>

                    <Editor
                        apiKey={
                            '4sotskl0ipae1fkhidjiczer00626csy54r5wcsptf8udmdb'
                        }
                        onInit={(evt, editor) => (editorRef.current = editor)}
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

                    <button
                        className='px-6 py-2 mt-4 text-white bg-orange-800 rounded-lg hover:bg-orange-900'
                        type='submit'
                        onClick={log}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostUpdate;
