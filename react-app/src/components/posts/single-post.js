import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { createAComment, getAllComments } from "../../store/comments";
import './SinglePost.css'

const SinglePost = () => {
  const currentPost = useSelector(state => state.posts.current);
  const comments = useSelector(state => state.comments.comments);
  const user = useSelector(state => state.session.user);
  const post_comments = comments.filter(comment => comment.post_id === currentPost.id);
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();

  const convertDate = (date) => {
    let converted = new Date(date);
    return converted.toLocaleString();
  }
  const commentsEnd = useRef(null);

  useEffect(() => {
    commentsEnd.current?.scrollIntoView();
  }, [comments])

  const onSubmit = async(e) => {
    if (e.keyCode === 13) {
      let comment = new FormData();
      comment.append('post_id', currentPost.id);
      comment.append('user_id', user.id);
      comment.append('comment', newComment);
      await dispatch(createAComment(comment));

      dispatch(getAllComments());
      setNewComment('');
      // console.log(comment, 'I have submitted a new comment......')
    }
  }

  // console.log('in single post', currentPost)
  // console.log('current post comments', post_comments)
  // console.log('my comment is...', newComment);
  return (
    <div className="single-post-container">
      <div className="single-post-img">
        {currentPost.images?.map(image => (
          <div key={image.id}>
            <img src={image.url} alt='cars' />
            {currentPost.user_id === user.id && <button>delete</button>}
          </div>
        ))}
        <div style={{ color: 'white' }}>{currentPost.title}</div>
      </div>
      <div className="single-post-content">
        <div className="poster-info">
          <div className="poster-img">
            <img src={currentPost.user_id.profile_url} alt='profile' />
            <div className="post-name"> {currentPost.user_id.username}</div>
          </div>
          <div className="poster-content">
            <p>{currentPost.description}</p>
            <p>{convertDate(currentPost.updated_at)}</p>
          </div>
        </div>
        <div className="comment-box">
          {post_comments?.map(comment => (
            <div key={comment.id} className='post-contents'>
              <div className="poster-img">
                <img src={comment.user_id.profile_url} alt='profile' />
                <div className="post-name">{comment.user_id.username}</div>
              </div>
              <div className="comment-content">
                <p>{comment.comment}</p>
                <p>{convertDate(comment.updated_at)}</p>
              </div>
            </div>
          ))}
          <div ref={commentsEnd}></div>
        </div>
        <div className="likes">
          <i className="fas fa-fire" />
          <label htmlFor="newComment" className="chat">
            <i className="far fa-comment" />
          </label>
        </div>
        <div className="create-comment">
          <input
            type='text'
            id='newComment'
            value={newComment}
            placeholder='Add a comment...'
            onChange={e => setNewComment(e.target.value)}
            className='crt-cmt-input'
            onKeyDown={onSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default SinglePost;
