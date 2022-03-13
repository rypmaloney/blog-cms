import Parser from 'html-react-parser';

const Post = (props) => {
    const { post } = props;
    const body = post.body_text;
    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <div
                className='content'
                dangerouslySetInnerHTML={{ __html: body }}
            ></div>
        </div>
    );
};

export default Post;
