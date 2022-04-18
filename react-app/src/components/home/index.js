import './Home.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts, deleteAPost } from '../../store/posts';
import { useEffect, useState } from 'react';
import { showModal, setCurrentModal } from '../../store/modal';
import EditPostForm from '../posts/edit-post-modal/edit-post';
import { setPost, getOnePost } from '../../store/posts';
import { getAllComments } from '../../store/comments';
import { useHistory } from 'react-router-dom';
import SinglePost from '../posts/single-post';


const Home = () => {
  // const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  const posts = useSelector(state => state.posts.posts);
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();
  const convertDate = (date) => {
    let converted = new Date(date);
    return converted.toLocaleString();
  }
  let history = useHistory();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllComments());
  }, [dispatch]);

  const deletePost = async (post_id) => {
    let data = await dispatch(deleteAPost(post_id));
    if (data) {
      setErrors(data);
    }
    dispatch(getAllPosts())
  }

  const showEditForm = (post) => {
    dispatch(setCurrentModal(EditPostForm));
    dispatch(showModal());
    dispatch(setPost(post));
  }

  const showSinglePost = async (post) => {
    let onePost = await dispatch(getOnePost(post.id));
    dispatch(setPost(onePost));
    if (onePost) {
      history.push(`/posts/${onePost.post.id}`);
      dispatch(setCurrentModal(SinglePost));
      dispatch(showModal());
    }
  }

  return (
    <div className='posts-container'>
      <h1>{user.username}'s Feed</h1>
      {errors?.map(error => (
        <div key={error}>{error}</div>
      ))}
      {posts?.map(post => (
        <div key={post.id} className='post'>
          <div className='user-info'>
            <div className='post-user'>
              <img src={post.user_id.profile_url} alt='profile-img' className='post-profile' />
              <div
                className='home-username'
                onClick={() => history.push(`/users/${post.user_id.id}`)}
                >
                  {post.user_id.username}
              </div>
            </div>
            {user.id === post.user_id.id ? (
              <div className='owner-buttons'>
                <button onClick={() => deletePost(post.id)}><i className="fas fa-trash-alt"></i></button>
                <button onClick={() => showEditForm(post)}><i className="fas fa-wrench"></i></button>
              </div>
            ) : <></>}
          </div>
          <div className='image-box'>
            <div className='images'>
              <img src={post.images[0].url} alt='post-img' className='post-images' />
              {post?.images?.length > 1 ?
                <div className='home-test'>
                  <i className="fas fa-clone" onClick={() => showSinglePost(post)}></i>
                </div> : <></>
              }
            </div>
          </div>
          <div className='post-content'>
            <button onClick={() => showSinglePost(post)}><i className="far fa-comment"></i></button>
            <div className='post-title'>
              <div className='username'>{post.user_id.username}</div>
              <div>{post.title}</div>
            </div>
            <p>{post.description}</p>
            <p>posted on {convertDate(post.created_at)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home;
