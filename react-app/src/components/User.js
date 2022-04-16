import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './NavBar.css'

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

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

  return (
    <div className='profile-container'>
      <div>
        <img src={user.profile_url} className='profile-user' alt='profile'/>
      </div>
      <div className='profile-details'>
        <strong>{user.username}</strong>
        <strong> {user.name}</strong>
      </div>
    </div>
  );
}
export default User;
