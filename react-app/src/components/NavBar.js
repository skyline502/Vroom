import './NavBar.css'
import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';


const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const [drop, setDrop] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (drop) {
      setDropDown('drop')
    } else {
      setDropDown(false)
    }
  }, [drop]);

  if (user) {
    return (
      <nav className='nav-bar'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src={'/vroom.png'} alt='logo' className='logo' />
          </NavLink>
        </div>
        <div className='nav-buttons'>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src='/garage.png' alt='home' className='home-btn' />
          </NavLink>
          <NavLink to='/users' exact={true} activeClassName='active'>
            <img src={'/users.png'} alt='users' className='users' />
          </NavLink>
          <NavLink to='/posts/create' exact={true} activeClassName='active'>
            <img src={'/add-post.png'} alt='post' className='create-post' />
          </NavLink>
          <NavLink to='/posts' exact={true} activeClassName='active'>
            <img src={'/cars.png'} alt='gallery' className='gallery' />
          </NavLink>
          <img src={user.profile_url} alt='profile' className='profile-pic' onClick={() => setDrop(!drop)} />
        </div>
        <div className={`drop-down ${dropdown}`}>
          <div style={{ paddingLeft: 15 }} onClick={() => history.push(`/users/${user.id}`)} className='profile-link'>Profile</div>
          <div>
            <LogoutButton />
          </div>
        </div>
      </nav>
    )
  }
  return (
    <nav className='nav-bar'>
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          <img src={'/vroom.png'} alt='logo' className='logo' />
        </NavLink>
      </div>
      <div>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
      </div>
      <div>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
