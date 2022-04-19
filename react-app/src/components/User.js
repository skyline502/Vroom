import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './User.css'
import { useDispatch, useSelector } from 'react-redux';
import { getOnePost, setPost, getAllPosts } from '../store/posts';
import SinglePost from './posts/single-post';
import { setCurrentModal, showModal } from '../store/modal';
import { getPostComments } from '../store/comments';

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.posts.posts);

  const posts = allPosts.filter(post => post.user_id.id === user.id);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch])

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

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
    <div className='profile-container'>
      <div className='profile-header'>
        <img src={user.profile_url} className='profile-user' alt='profile' />
        <div className='profile-details'>
          <strong>{user.username}</strong>
          <div className='posts-info'>
            <strong>{user.posts?.length}</strong>
            <p>posts</p>
          </div>
          <strong> {user.name}</strong>
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
    </div>
  );
}
export default User;
