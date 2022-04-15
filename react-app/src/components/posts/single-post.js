import { useSelector, useDispatch } from "react-redux";


const SinglePost = () => {
  const currentPost = useSelector(state => state.posts.current);
  const comments = useSelector(state => state.comments.comments);
  const post_comments = comments.filter(comment => comment.post_id === currentPost.id);

  console.log('in single post', currentPost)
  console.log('current post comments', post_comments)
  return (
    <h1>A Single Post!</h1>
  )
}

export default SinglePost;
