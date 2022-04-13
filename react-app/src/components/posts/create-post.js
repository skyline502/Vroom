import './CreatePost.css'
import { useState } from 'react';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const addImage = e => {
    const image = e.target.files[0]
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

  const onSubmit = (e) => {
    e.preventDefault();

  }

  console.log(images, '...curent images in bucket')

  return (
    <div className='create-posts-box'>
      <div className="create-post-container">
        <img src={'/vroom-login.png'} alt='login' className='login-logo' />
        <form>
          {errors?.map(error => (
            <div key={error}>{error}</div>
          ))}
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle([...images, e.target.files[0]])}
            placeholder='enter a title'
          />
          <input
            type='text'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='enter a description'
          />
          <input
            type='file'
            name='image'
            accept='image/*'
            onChange={addImage}
            placeholder='add an image'
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
