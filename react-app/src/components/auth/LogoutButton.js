import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './button.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <button onClick={onLogout} className='logout-btn'>Logout</button>;
};

export default LogoutButton;
