import './CreatePost.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAPost } from '../../store/posts';
import { useHistory } from 'react-router-dom';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let history = useHistory();

  const addImage = e => {
    const image = e.target.files[0]
    setErrors([]);
    if (image.size > 1000000) {
      setErrors(['File size too large, image must be less than 1MB in size'])
      return;
    }
    if (images.length === 5) {
      setErrors(['You already have 5 images!'])
      return;
    }
    if (!images.length) {
      setImages([image]);
    } else if (images.length && images.length < 6) {
      setImages([...images, image]);
    }
  }

  console.log('user...', user)
  console.log('errors....', errors)

  console.log({title, description,images})

  const onSubmit = async(e) => {
    e.preventDefault();
    const user_id = user.id
    let validationErrors = [];

    if (title.length < 8 || title.length > 50) {
      validationErrors.push('Title must be between 8 and 50 characters in length')
    }

    if (description.length < 8 || description.length > 2000) {
      validationErrors.push('Description must be between 8 and 2000 characters in length.')
    }

    if (validationErrors) {
      setErrors(validationErrors);
    }

    console.log(validationErrors)
    if (!validationErrors.length) {
      console.log('does it reach here..............')
      let form = new FormData();
      images.forEach((image, i) => {
        form.append('images array', image)
      });
      form.append('user_id', user_id);
      form.append('title', title);
      form.append('description', description);

      let data = await dispatch(createAPost(form));

      if (data) {
        setErrors(data);
      }

      history.push('/posts')
    }
  }

  console.log(images, '...curent images in bucket')

  return (
    <div className='create-posts-box'>
      <div className="create-post-container">
        <img src={'/vroom-login.png'} alt='login' className='login-logo' />
        <form onSubmit={onSubmit}>
          {errors?.map(error => (
            <div key={error}>{error}</div>
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
          <input
            type='file'
            name='image'
            accept='image/*'
            onChange={addImage}
            placeholder='add an image'
            required={true}
          />
          <button type='submit'>create post</button>
        </form>
      </div>
      <div className='image-preview'>
        <div className='image-preview-header'>
          <h2>Add up to 5 images</h2>
        </div>
        <div className='img-box'>
          {images?.map(image => (
            <div key={image.name}>
              <img src={URL.createObjectURL(image)} className='img-prev' alt='img preview' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CreatePostForm;
