import { useSelector, useDispatch } from "react-redux";
import './SinglePost.css'

const SinglePost = () => {
  const currentPost = useSelector(state => state.posts.current);
  const comments = useSelector(state => state.comments.comments);
  const post_comments = comments.filter(comment => comment.post_id === currentPost.id);

  const convertDate = (date) => {
    let converted = new Date(date);
    return converted.toLocaleString();
  }

  console.log('in single post', currentPost)
  console.log('current post comments', post_comments)
  return (
    <div className="single-post-container">
      <div className="single-post-img">
        {currentPost.images?.map(image => (
          <img key={image.id} src={image.url} alt='cars'/>
        ))}
        <div style={{color: 'white'}}>{currentPost.title}</div>
      </div>
      <div className="single-post-content">
        <div className="poster-info">
          <div className="poster-img">
            <img src={currentPost.user_id.profile_url} alt='profile' />
          </div>
          <div className="poster-content">
            <div className="post-name"> {currentPost.user_id.username}</div>
            <p>{currentPost.description}</p>
            <p>{convertDate(currentPost.updated_at)}</p>
          </div>
        </div>
        <div className="poster-post-content">
          {post_comments?.map(comment => (
            <div key={comment.id} className='post-contents'>
              <div className="poster-img">
                <img src={comment.user_id.profile_url} alt='profile' />
              </div>
              <div className="comment-content">
                <div>{comment.user_id.username}</div>
                <p>{comment.comment}</p>
                <p>{convertDate(comment.updated_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SinglePost;
