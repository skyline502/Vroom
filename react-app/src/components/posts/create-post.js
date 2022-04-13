import './CreatePost.css'
import {useState} from 'react';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');

  return (
    <div className="create-post-container">
      <img src={'/vroom-login.png'} alt='login' className='login-logo' />
      <form>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='enter a title'
        />
      </form>
    </div>
  )
}

export default CreatePostForm;
