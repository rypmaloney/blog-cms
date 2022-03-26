import {
    BrowserRouter,
    Routes,
    Route,
    useParams,
    HashRouter,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import AllPosts from './components/main/AllPosts';
import Login from './components/main/Login';
import NewPost from './components/main/NewPost';
import SignUp from './components/main/SignUp';
import PostUpdate from './components/main/PostUpdate';

import Header from './components/partials/Header';

const App = () => {
    const [posts, setPosts] = useState(false);

    //Login stuff
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(
        localStorage.getItem('isLoggedIn')
    );
    const [token, setToken] = useState(localStorage.getItem('token'));

    const getPosts = async () => {
        try {
            const res = await fetch(
                'https://obscure-wildwood-18149.herokuapp.com/api/posts/ '
            );
            if (res.status !== 200) {
                console.log(res.status);
                setMessage(res);
                setPosts(false);
            } else {
                const posts = await res.json();
                setPosts(posts);
            }
        } catch (err) {
            setPosts(false);
            setMessage(err);
        }
    };

    useEffect(() => {
        getPosts();

        //dependency is post.length. This means the run happens twice,
        //allowing the Posts to pass to child components without having to fetch themselves.
        //If you don't render twice, child components like PostUpdate render ~simultaneously and only hold the initial value for posts, which is false
    }, []);

    return (
        <div className='bg-gray-200 py-16'>
            <Header />

            <Routes>
                {
                    <Route
                        exact
                        path='/'
                        element={
                            <Login
                                setUsername={setUsername}
                                setPassword={setPassword}
                                username={username}
                                password={password}
                                isLoggedIn={isLoggedIn}
                                setLoggedIn={setLoggedIn}
                            />
                        }
                    />
                }

                <Route
                    exact
                    path='/sign-up/'
                    element={
                        <SignUp
                            setUsername={setUsername}
                            setPassword={setPassword}
                            username={username}
                            password={password}
                            isLoggedIn={isLoggedIn}
                            setLoggedIn={setLoggedIn}
                        />
                    }
                />
                <Route
                    path='/posts/'
                    element={<AllPosts posts={posts} isLoggedIn={isLoggedIn} />}
                />
                <Route
                    path='/posts/new/'
                    element={<NewPost token={token} getPosts={getPosts} />}
                />

                <Route
                    path='/posts/:id/update/'
                    element={
                        <PostUpdate
                            posts={posts}
                            setPosts={setPosts}
                            token={token}
                            getPosts={getPosts}
                        />
                    }
                ></Route>
            </Routes>
            {/* <Footer /> */}
        </div>
    );
};

export default App;
