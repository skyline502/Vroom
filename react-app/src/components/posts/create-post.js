import './CreatePost.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAPost } from '../../store/posts';
import { useHistory } from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import { showModal, setCurrentModal, hideModal } from '../../store/modal';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let history = useHistory();
  const allowedExt = ["png", "jpg", "jpeg", "gif"];

  const names = images.map(image => image.name);
  console.log('filenames', names)

  const addImage = e => {
    const image = e.target.files[0]
    setErrors([]);


    if (image?.size > 1000000) {
      setErrors(['File size too large, image must be less than 1MB in size'])
      return;
    }
    if (images?.length === 5) {
      setErrors(['You already have 5 images!'])
      return;
    }
    if (!allowedExt.includes(image?.name.split('.')[1])) {
      setErrors(['That is not a supported image type!']);
      return;
    }
    if (names.includes(image.name)) {
      setErrors(['You have already added this image!']);
      return;
    }

    if (!images?.length) {
      setImages([image]);
    } else if (images?.length && images?.length < 6) {
      setImages([...images, image]);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const user_id = user.id
    let validationErrors = [];

    if (title.length < 8 || title.length > 50) {
      validationErrors.push('Title must be between 8 and 50 characters in length')
    }

    if (description.length < 8 || description.length > 200) {
      validationErrors.push('Description must be between 8 and 200 characters in length.')
    }

    if (!images.length) {
      validationErrors.push('Please add at least 1 image');
    }

    if (validationErrors) {
      setErrors(validationErrors);
    }

    if (!validationErrors.length) {
      e.preventDefault();
      let form = new FormData();
      images.forEach((image) => {
        form.append('images array', image)
      });

      form.append('user_id', user_id);
      form.append('title', title);
      form.append('description', description);

      dispatch(setCurrentModal(LoadingScreen))
      dispatch(showModal());

      let data = await dispatch(createAPost(form));
      if (data) {
        setErrors(data);
        dispatch(hideModal());
        return;
      }
      setTimeout(() => history.goBack(), 500);
      setTimeout(() => dispatch(hideModal()), 800);
    }
  }

  const cancel = () => {
    history.goBack();
  }

  return (
    <div className='create-posts-box'>
      <div className="create-post-container">
        <img src={'/vroom-login.png'} alt='login' className='login-logo' />
        <form onSubmit={onSubmit}>
          {errors?.map(error => (
            <div key={error} className='errors'>{error}</div>
          ))}
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='enter a title'
            required={true}
          />
          <input
            type='text'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='enter a description'
            required={true}
          />
          <label className='aws-image-box'>
            <div className='aws'>
              <i className='fas fa-image'></i>
              upload up to 5 images
            </div>
            <input
              type='file'
              name='image'
              accept='image/*'
              onChange={addImage}
              placeholder='add an image'
              className='aws-upload'
            />
          </label>
            <button className='create-post' type='submit'>create post</button>
        </form>
        <button className='cancel-btn' onClick={() => cancel()}>cancel</button>
      </div>
      <div className='image-preview'>
        <div className='image-preview-header'>
          <h2>Add up to 5 images</h2>
        </div>
        <div className='img-box'>
          {images?.map(image => (
            <div key={image.name} className='create-img-tile'>
              <img src={URL.createObjectURL(image)} className='img-prev' alt='img preview' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreatePostForm;
