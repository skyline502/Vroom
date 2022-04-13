import './NavBar.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';


const NavBar = () => {
  const user = useSelector(state => state.session.user);

  if (user) {
    return (
      <nav className='nav-bar'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src='/garage.png' alt='home' className='home-btn'/>
          </NavLink>
        </div>
        <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </div>
        <div>
          <LogoutButton />
        </div>
      </nav>
    )
  }
  return (
    <nav className='nav-bar'>
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
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
      <div>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </div>
      <div>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
