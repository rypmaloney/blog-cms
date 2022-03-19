import { Link } from 'react-router-dom';
const Post = (props) => {
    const { post } = props;
    const body = post.body_text;

    return (
        <div className='px-2 py-6 m-4 md:w-4/5 '>
            <div className='px-4 py-8 md:p-10 text-left bg-white shadow-lg max-w-5xl'>
                <div className='flex flex-row justify-between'>
                    <h2 className='text-2xl font-extrabold text-amber-700'>
                        {post.title} -{' '}
                        <span className='text-slate-600 text-lg'>
                            {post.stage}
                        </span>
                    </h2>
                    {post.pinned ? (
                        <p className='text-orange-800'>Pinned</p>
                    ) : (
                        false
                    )}
                </div>
                <p>{new Date(post.date).toLocaleDateString()}</p>

                <div
                    className='my-4'
                    dangerouslySetInnerHTML={{ __html: body }}
                ></div>

                <Link
                    className='text-lg text-orange-600 '
                    to={`/posts/${post._id}/update`}
                >
                    Edit this post
                </Link>
            </div>
        </div>
    );
};

export default Post;
