const Post = (props) => {
    const { post } = props;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <p>{post.body_text}</p>
        </div>
    );
};

export default Post;
