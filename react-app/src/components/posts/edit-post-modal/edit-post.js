import './EditPost.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editAPost, getAllPosts } from '../../../store/posts';
import { hideModal } from '../../../store/modal';

const EditPostForm = () => {
  const currentPost = useSelector(state => state.posts.current);
  const [title, setTitle] = useState(currentPost?.title);
  const [description, setDescription] = useState(currentPost?.description);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();


  const curentImages = currentPost?.images;
  console.log('current post........', currentPost);
  console.log('current images...', curentImages);
  console.log('user_id', currentPost.user_id.id)

  const addImage = e => {
    const image = e.target.files[0]
    setErrors([]);
    if (image.size > 1000000) {
      setErrors(['File size too large, image must be less than 1MB in size'])
      return;
    }
    if (images.length + curentImages.length === 5) {
      setErrors(['You already have 5 images!'])
      return;
    }
    if (!images.length) {
      setImages([image]);
    } else if (images.length && images.length < 6) {
      setImages([...images, image]);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = [];

    if (title.length < 8 || title.length > 50) {
      validationErrors.push('Title must be between 8 and 50 characters in length')
    }

    if (description.length < 8 || description.length > 200) {
      validationErrors.push('Description must be between 8 and 200 characters in length.')
    }

    if (validationErrors) {
      setErrors(validationErrors);
    }

    console.log(validationErrors)
    if (!validationErrors.length) {
      console.log('does it reach here..............', title, description)
      let form = new FormData();
      images?.forEach((image, i) => {
        form.append('images array', image)
      });

      form.append('title', title);
      form.append('description', description);
      form.append('id', currentPost.id);
      form.append('user_id', currentPost.user_id.id);

      let data = await dispatch(editAPost(form));

      if (data) {
        setErrors(data);
      }
      dispatch(getAllPosts())
      dispatch(hideModal())
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
          />
          <button type='submit'>edit post</button>
        </form>
      </div>
      <div className='image-preview'>
        <div className='previous-images'>
          <h2>previous images</h2>
          <div className='prev-img-box'>
            {curentImages?.map(image => (
              <img key={image.id} src={image.url} alt='prev-images' />
            ))}
          </div>
        </div>
        <div className='image-preview-header'>
          <h2>limit of 5 images</h2>
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

export default EditPostForm;
