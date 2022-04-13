import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './LoginForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [profile_pic, setProfile] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirm) {
      const data = await dispatch(signUp(name, username, email, password, confirm, profile_pic));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setConfirm(e.target.value);
  };

  const updateProfile = (e) => {
    const file = e.target.files[0];
    setProfile(file);
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='sign-up-container'>
      <img src={'/vroom-login.png'} alt='login' className='login-logo' />
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input
            type='text'
            name='name'
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder='name'
          />
        </div>
        <div>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder='username'
          ></input>
        </div>
        <div>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder='email'
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder='password'
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='confirm'
            onChange={updateRepeatPassword}
            value={confirm}
            required={true}
            placeholder='confirm password'
          ></input>
        </div>
        <div>
          <label className='aws-profile-box'>
            <div className='aws'>
              <i className='fas fa-image'></i>
              upload profile picture
            </div>
            <input
              type='file'
              accept='image/*'
              name='profile_url'
              onChange={updateProfile}
              defaultValue={profile_pic}
              placeholder='profile picture'
              className='aws-upload'
            />
          </label>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
      <Link to='/login' className='cancel-sign-up'>Cancel</Link>
    </div>
  );
};

export default SignUpForm;
