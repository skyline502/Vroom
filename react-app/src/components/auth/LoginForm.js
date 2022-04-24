import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { showModal, setCurrentModal } from '../../store/modal';
import './LoginForm.css'
import SignUpForm from './SignUpForm';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const showSignUpForm = () => {
    dispatch(setCurrentModal(SignUpForm));
    dispatch(showModal());
  }

  return (
    <div className='splash-container'>
      <div className='about-container'>
        <div className='about-header'>
          <h3>stand out on vroom</h3>
        </div>
        <div className='about-message'>
          <h2>Connect with people who love cars, show off your ride by creating content and giving feedback on other people's rides.</h2>
        </div>
      </div>
      <div className='login-container'>
        <div className='login-header'>
          <img src={'/vroom-login.png'} alt='login' className='login-logo' />
        </div>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className='errors'>{error}</div>
            ))}
          </div>
          <div>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button type='submit'>Log In</button>
        </form>
        <div className='login-sign-up'><p>Don't have an account?</p><button onClick={showSignUpForm}>sign up</button></div>
        <div className='demo-btn'>
          <p style={{ marginTop: 1 }}>Log in as a</p>
          <button
            className='demo'
            onClick={() => dispatch(login('demo@aa.io', 'password'))}
          >Demo user</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
