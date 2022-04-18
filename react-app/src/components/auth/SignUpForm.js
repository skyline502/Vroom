import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { hideModal } from '../../store/modal';
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

  const convertDate = (date) => {
    let converted = new Date(date);
    return converted.toLocaleString();
  }

  const onSignUp = async (e) => {
    setErrors([]);
    e.preventDefault();
    let validationErrors = []
    let emailValidation = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    const allowedExt = ["png", "jpg", "jpeg", "gif"];

    if (username.length < 2 || username.length > 255) {
      validationErrors.push('username must be between 2 and 255 characters in length');
    }

    if (!emailValidation.test(email)) {
      validationErrors.push('Please provide a valid email.')
    }

    if (name.length < 2 || name.length > 100) {
      validationErrors.push('Name must be between 2 and 100 characters long')
    }

    if (password.length < 8 || password.length > 255) {
      validationErrors.push('Password must be between 8 and 255 characters long.')
    }

    if (password !== confirm) {
      validationErrors.push('Passwords do not match.')
    }

    if (profile_pic && !allowedExt?.includes(profile_pic?.name.split('.')[1])) {
      validationErrors.push(`${profile_pic?.name}'s is not an image file!`)
    }

    if (errors) {
      setErrors(validationErrors)
    }

    if (password === confirm && !errors.length) {
      setErrors([])
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
    setErrors([])
    const file = e.target.files[0];
    if (file.size < 1000000) {
      setProfile(file);
    } else {
      setErrors(['File is too large, files must be less than 1MB in size'])
    }
  }

  if (user) {
    dispatch(hideModal());
    return <Redirect to='/' />;
  }

  return (
    <div className='sign-up-container'>
      <img src={'/vroom-login.png'} alt='login' className='login-logo' />
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind} className='errors'>{error}</div>
          ))}
        </div>
        <div>
          <input
            type='text'
            name='name'
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder='name'
            required={true}
          />
        </div>
        <div>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder='username'
            required={true}
          ></input>
        </div>
        <div>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder='email'
            required={true}
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder='password'
            required={true}
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
              required={true}
            />
          </label>
        </div>
        <button className='sign-up-btn' type='submit'>Sign Up</button>
      </form>
      <button className='cancel-sign-up' onClick={() => dispatch(hideModal())}>Cancel</button>
      {profile_pic &&
        <div className='user-license'>
          <div className='license-header'>
            <div><h2>Vroom member</h2></div>
            <div><h4>license</h4></div>
          </div>
          <div className='user-license-info'>
            <div className='license-photo'>
              <img src={URL.createObjectURL(profile_pic)} alt='img preview' />
            </div>
            <div className='license-info'>
              <h2>{name}</h2>
              <h2>{username}</h2>
              <h2>{email}</h2>
              <h2>DOB:{convertDate(new Date()).split(',')[0]}</h2>
              <h5>signature</h5>
              <h6 className='signature'>{name}</h6>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default SignUpForm;
