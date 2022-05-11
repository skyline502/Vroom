import './Home.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import { useEffect, useRef } from 'react';
import { showModal, setCurrentModal } from '../../store/modal';
import { setPost, getOnePost } from '../../store/posts';
import { getPostComments } from '../../store/comments';
import { useHistory } from 'react-router-dom';
import SinglePost from '../posts/single-post';
import Options from '../options';
import { createALike } from '../../store/posts';
import { getFollowed } from '../../store/session';



const Home = () => {
  const user = useSelector(state => state.session.user);
  const posts = useSelector(state => state.session.followed);
  const dispatch = useDispatch();
  const convertDate = (date) => {
    let converted = new Date(date);
    return converted.toLocaleString();
  }
  let history = useHistory();
  const topOfPage = useRef(null);

  console.log(user, 'current user......')

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getFollowed(user))
  }, [dispatch, user]);

  const showSinglePost = async (post) => {
    let onePost = await dispatch(getOnePost(post.id));
    dispatch(setPost(onePost));
    if (onePost) {
      await getPostComments(onePost.post.id);
      dispatch(setCurrentModal(SinglePost));
      dispatch(showModal());
    }
  }

  const showOptions = async (post) => {
    let onePost = await dispatch(getOnePost(post.id));
    dispatch(setPost(onePost));
    if (onePost) {
      dispatch(setCurrentModal(Options));
      dispatch(showModal());
    }
  }

  const like = async (post) => {
    let newLike = new FormData();
    newLike.append('post_id', post.id);
    newLike.append('user_id', user.id);

    await dispatch(createALike(newLike));
    dispatch(getAllPosts());
  }

  return (
    <div className='posts-container' ref={topOfPage}>
      <h1>{user.username}'s Feed</h1>
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
            <div className='options-menu'>
              <i className="fas fa-ellipsis-h" onClick={() => showOptions(post)}></i>
            </div>
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
            <div className='post-btns'>
              <button onClick={() => showSinglePost(post)}><i className="far fa-comment" id='comment-home'></i></button>
              {post?.likes?.filter(like => like.user_id === user.id).length > 0 ? <i style={{ color: 'red' }} className="fas fa-heart" onClick={() => like(post)} /> : <i className="far fa-heart" id='liked' onClick={() => like(post)} />}
            </div>
            <div>{`${post.likes.length} Likes`}</div>
            <div className='post-title'>
              <div>{post.title}</div>
            </div>
            <p>{post.description}</p>
            <div className='all-comments' onClick={() => showSinglePost(post)}>{`view all ${post?.comments?.length} comments`}</div>
            <p>posted on {convertDate(post.created_at)}</p>
          </div>
        </div>
      ))}
      <button className='to-the-top' onClick={() => topOfPage.current?.scrollIntoView({ behavior: 'smooth' })}><i className="fas fa-chevron-circle-up" /></button>
    </div>
  )
}

export default Home;
