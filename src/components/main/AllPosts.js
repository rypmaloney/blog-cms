import Post from '../partials/Post';
import uniqid from 'uniqid';
import Aside from '../partials/Aside';

const AllPosts = (props) => {
    const { posts, isLoggedIn } = props;

    function PostPageConditions(props) {
        //If the user has logged in, they can see content.
        if (isLoggedIn) {
            //If there are no posts (the API call has been successfull)
            if (posts === false) {
                //show user an error message
                return (
                    <div className='h-screen'>
                        <h1 className='py-24 px-14'>
                            I'm having some trouble fetching posts...
                        </h1>
                        ;
                    </div>
                );
            } else {
                return (
                    <div className=''>
                        <Aside />
                        <div className='flex md:flex-row my-16 flex-col md:mr-16'>
                            <div className='md:ml-80 mx-auto'></div>
                            <div className='flex flex-col items-center justify-center min-h-screen  md:w-4/5 '>
                                {posts.map((post) => {
                                    return <Post post={post} key={uniqid()} />;
                                })}
                            </div>
                        </div>
                    </div>
                );
            }

            //The user is not logged in, so prompt them to.
        } else {
            return (
                <div className='min-h-screen p-14'>
                    <p>
                        Please,{' '}
                        <a className='text-orange-600' href='/'>
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
            <PostPageConditions isLoggedIn={isLoggedIn} posts={posts} />
        </div>
    );
};

export default AllPosts;
