import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './User.css'

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  const posts = user.posts

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

  console.log(user, 'user........')
  console.log(posts, 'user posts.......')

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
      <div className='users-posts'>
        {posts?.map(post => (
          <div key={post.id} className='user-tiles' >
            <img src={post.images[0].url} alt='tile' />
            <p>{post.comments?.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default User;
