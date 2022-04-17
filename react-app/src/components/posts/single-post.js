import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { createAComment, getAllComments } from "../../store/comments";
import { getAllPosts, getOnePost } from "../../store/posts";
import { deleteAComment, editAComment } from "../../store/comments";
import './SinglePost.css';
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const currentPost = useSelector(state => state.posts.current.post);
  const {postId} = useParams();
  const comments = useSelector(state => state.comments.comments);
  const user = useSelector(state => state.session.user);
  const post_comments = comments.filter(comment => comment.post_id === currentPost.id);
  const [newComment, setNewComment] = useState('');
  const [comment_id, setComment_Id] = useState(null);
  const [errors, setErrors] = useState([]);
  const [idx, setIdx] = useState(0);
  const [showEdit, setShowEdit] = useState(false);
  const [editField, setEditField] = useState(null);
  const [currentComment, setCurrentComment] = useState('');
  const dispatch = useDispatch();

  console.log(postId, 'post id....');
  console.log(currentPost, 'current post.......')

  const convertDate = (date) => {
    let converted = new Date(date);
    return converted.toLocaleString();
  }
  const commentsEnd = useRef(null);

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch])

  useEffect(() => {
    commentsEnd.current?.scrollIntoView();
  }, [comments])

  useEffect(() => {
    if (showEdit) {
      setEditField('show-edit')
    } else {
      setEditField(null);
    }
  }, [showEdit])

  const nextPic = () => {
    if (idx !== currentPost.images.length - 1) {
      setIdx(idx + 1);
    } else if (idx === currentPost.images.length - 1) {
      setIdx(0);
    }
  }

  const previousPic = () => {
    if (idx !== 0) {
      setIdx(idx - 1);
    } else if (idx === 0) {
      setIdx(currentPost.images.length - 1);
    }
  }

  const handleEdit = (comment) => {
    setShowEdit(true);
    setCurrentComment(comment.comment);
    setComment_Id(comment.id);
  }

  const handleEditSubmit = async (e) => {
    setErrors([]);
    if (e.keyCode === 13) {
      if (currentComment.length < 2) {
        setErrors(['comments must be between 2 and 200 characters in length.']);
        return;
      }

      let form = new FormData();

      form.append('comment_id', comment_id);
      form.append('comment', currentComment);
      form.append('post_id', currentPost.id);
      form.append('user_id', user.id);

      let data = await dispatch(editAComment(form));

      if (data) {
        setErrors(data);
      }
      dispatch(getAllComments());
      setShowEdit(false);
    }

  }

  const onSubmit = async (e) => {
    setErrors([]);
    if (e.keyCode === 13) {
      if (newComment.length < 2 || newComment.length > 200) {
        setErrors(['Comment must be between 2 and 200 characters in length.'])
        return;
      } else {
        let comment = new FormData();
        comment.append('post_id', currentPost.id);
        comment.append('user_id', user.id);
        comment.append('comment', newComment);
        await dispatch(createAComment(comment));

        dispatch(getAllComments());
        setNewComment('');
      }
    }
  }

  return (
    <div className="single-post-container">
      <div className="single-post-img-box">
        <div style={{ color: 'white' }} className='image-title'>{currentPost.title}</div>
        <img src={currentPost.images[idx].url} alt='cars' className="current-img" />
        <div className="image-btns">
          {idx === 0 ? <p>.</p> :
            <button onClick={previousPic}><i className="fas fa-angle-left fa-lg" style={{ color: 'white' }} /></button>
          }
          <p style={{ color: 'white' }}>{idx + 1}/{currentPost.images.length}</p>
          {idx === currentPost.images.length - 1 ? <p>.</p> :
            <button onClick={nextPic}><i className="fas fa-angle-right fa-lg" style={{ color: 'white' }} /></button>
          }
        </div>
      </div>
      <div className="single-post-content">
        <div className="poster-info">
          <div className="poster-img">
            <img src={currentPost.user_id.profile_url} alt='profile' />
            <div className="post-name"> {currentPost.user_id.username}</div>
          </div>
          <div className="poster-content">
            <p className="current-post-desc">{currentPost.description}</p>
            <p className="date">Posted on {convertDate(currentPost.updated_at)}</p>
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
                <p className="the-comment">{comment.comment}</p>
                <p className="date">Posted on {convertDate(comment.created_at)}</p>
                {comment.created_at !== comment.updated_at &&
                  <p className="updated">Updated on {convertDate(comment.updated_at)}</p>
                }
                {comment.user_id.id === user.id &&
                  <div className="edit-menu">
                    <button onMouseEnter={() => setShowEdit(false)} onClick={() => dispatch(deleteAComment(comment.id))}><i className="fas fa-trash-alt"></i></button>
                    <div className="comment-btns">
                      <label htmlFor={`edit-${comment.id}`}>
                        <i className="fas fa-edit"  onMouseEnter={() => handleEdit(comment)} />
                      </label>
                      <div className={`edit-cmt-field ${editField}`}>
                        <input
                          type='text'
                          id={`edit-${comment.id}`}
                          value={currentComment}
                          onChange={e => setCurrentComment(e.target.value)}
                          onKeyDown={handleEditSubmit}
                          onMouseLeave={() => setShowEdit(false)}
                        />
                      </div>
                    </div>
                  </div>
                }
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
        <div className="num-likes">{currentPost.likes.length}<p>likes</p></div>
        {errors?.map(error => (
          <div key={error} className='errors-map'>{error}</div>
        ))}
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
