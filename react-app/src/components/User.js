import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './User.css'
import { useDispatch, useSelector } from 'react-redux';
import { getOnePost, setPost, getAllPosts } from '../store/posts';
import SinglePost from './posts/single-post';
import { setCurrentModal, showModal } from '../store/modal';
import { getPostComments } from '../store/comments';
import { useHistory } from 'react-router-dom';
import { followThisUser } from '../store/session';

function User() {
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.posts.posts);
  const currentUser = useSelector(state => state.session.user);

  const topOfPage = useRef(null);
  let history = useHistory();

  const posts = allPosts.filter(post => post.user_id.id === user.id);

  const isFollowing = () => {
    let following = followers.filter(follower => follower.id === currentUser.id);

    return following.length > 0;
  }

  const follow = async () => {

    await dispatch(followThisUser(userId));
    (async () => {
      if (isNaN(Number(userId))) {
        history.push('/404');
        return;
      }
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      if (user.errors) {
        history.push('/404');
      } else {
        setUser(user);
        setFollowers(user.followers)
      }
    })();
  }

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch])

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      if (isNaN(Number(userId))) {
        history.push('/404');
        return;
      }
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      if (user.errors) {
        history.push('/404');
      } else {
        setUser(user);
        setFollowers(user.followers)
      }
    })();
  }, [userId, history]);

  if (!user) {
    return null;
  }

  const showSinglePost = async (post) => {
    let onePost = await dispatch(getOnePost(post.id));
    dispatch(setPost(onePost));
    if (onePost) {
      await getPostComments(onePost.post.id);
      dispatch(setCurrentModal(SinglePost));
      dispatch(showModal());
    }
  }

  return (
    <div className='profile-container' ref={topOfPage}>
      <div className='profile-header'>
        <img src={user.profile_url} className='profile-user' alt='profile' />
        <div className='profile-details'>
          <strong>Username:&nbsp;&nbsp;{user.username}</strong>
          <strong>Name:&#160;&nbsp;{user.name}</strong>
          <div className='posts-info'>
            <strong>Posts:&nbsp;&nbsp;{posts?.length}</strong>
          </div>
          <div className='followers-info'>
            <strong>Followers:&nbsp;&nbsp;{followers?.length === 0 ? 'No followers yet!': followers?.length}</strong>
            {
              user.id !== currentUser.id ?
                <div className='followers-button'>{isFollowing() ? <button onClick={() => follow()}>unfollow</button> : <button onClick={() => follow()}>follow</button>}</div> : <></>
            }
          </div>
        </div>
      </div>
      {/* <div className='user-posts-heading'>
        <h4><i className="fas fa-th"/>Posts</h4>
      </div> */}
      <div className='users-posts'>
        {posts?.map(post => (
          <div key={post.id} className='user-tiles' >
            <img src={post?.images[0].url} alt='tile' />
            {post.images?.length > 1 ?
              <div className='test'>
                <i className="fas fa-clone"></i>
              </div> : <></>
            }
            <div className='comments-tiles' onClick={() => showSinglePost(post)}>
              <i className="fas fa-heart" />
              <p>{post.likes?.length}</p>
              <i className="fas fa-comment"></i>
              <p>{post.comments?.length}</p>
            </div>
          </div>
        ))}
      </div>
      <button className='to-the-top' onClick={() => topOfPage.current?.scrollIntoView({ behavior: 'smooth' })}><i className="fas fa-chevron-circle-up" /></button>
    </div>
  );
}
export default User;
