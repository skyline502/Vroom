import { hideModal, setCurrentModal, showModal } from "../../store/modal";
import { setPost } from "../../store/posts";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts, deleteAPost } from "../../store/posts";
import EditPostForm from "../posts/edit-post-modal/edit-post";
import './Options.css';
import SinglePost from '../posts/single-post';
import { getPostComments } from "../../store/comments";


const Options = () => {
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const currentPost = useSelector(state => state.posts.current.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  const deletePost = async (post_id) => {
    let data = await dispatch(deleteAPost(post_id));
    if (data) {
      setErrors(data);
    }
    dispatch(getAllPosts())
    dispatch(hideModal());
  }

  const showEditForm = (post) => {
    dispatch(setCurrentModal(EditPostForm));
    dispatch(showModal());
    dispatch(setPost(post));
  }

  const showSinglePost = async () => {
    await getPostComments(currentPost.id);
    dispatch(setCurrentModal(SinglePost));
    dispatch(showModal());
  }

  return (
    <div className="options-container">
      {errors?.map(error => (
        <div key={error}>{error}</div>
      ))}
      <div className="options">
        {user.id === currentPost.user_id?.id ? (
          <div className='options-buttons'>
            <div onClick={() => showSinglePost(currentPost)}><p>Go to post</p></div>
            <div><button onClick={() => showEditForm(currentPost)}>Edit Post</button></div>
            <div><button onClick={() => deletePost(currentPost.id)} style={{ color: 'red' }}>Delete Post</button></div>
            <p onClick={() => dispatch(hideModal())}>cancel</p>
          </div>
        ) : <div className="options-buttons">
          <p onClick={() => showSinglePost()}>Go to post</p>
          <p onClick={() => dispatch(hideModal())}>cancel</p>
        </div>
        }
      </div>
    </div>
  )
}


export default Options;
