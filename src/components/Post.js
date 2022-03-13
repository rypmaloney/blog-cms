import Parser from 'html-react-parser';

const Post = (props) => {
    const { post } = props;
    const body = post.body_text;
    return (
        <div className='px-8 py-6 mt-4 m-14 text-left bg-white shadow-lg '>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <div
                className='content'
                dangerouslySetInnerHTML={{ __html: body }}
            ></div>
            <a href={`/posts/${post._id}/update`}>Edit this post</a>
        </div>
    );
};

export default Post;
