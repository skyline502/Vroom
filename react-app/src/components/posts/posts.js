import './Posts.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts, deleteAPost } from '../../store/posts';
import { useEffect, useState } from 'react';


const Posts = () => {
  // const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  const posts = useSelector(state => state.posts.posts)

  console.log(posts, 'on posts page')
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch();
  const convertDate = (date) => {
    let converted = new Date(date);
    return converted.toLocaleString();
  }

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  console.log(user, 'user....')
  console.log(posts, 'posts.....')

  const deletePost = async (post_id) => {
    let data = await dispatch(deleteAPost(post_id));
    if (data) {
      setErrors(data);
    }
    dispatch(getAllPosts())
  }

  return (
    <div className='posts-container'>
      <h1>Posts Page</h1>
      {errors?.map(error => (
        <div key={error}>{error}</div>
      ))}
      {posts?.map(post => (
        <div key={post.id} className='post'>
          <div className='user-info'>
            <div><img src={post.user_id.profile_url} alt='profile-img' className='post-profile' /></div>
            <div>{post.user_id.username}</div>
            {user.id === post.user_id.id ? (
              <div className='owner-buttons'>
                <button onClick={() => deletePost(post.id)}>delete</button>
                <button>edit</button>
              </div>
            ) : <></>}
          </div>
          <div className='image-box'>
            <div className='images'>
              {post.images?.map(image => (
                <img key={image.id} src={image.url} alt='post-img' className='post-images' />
              ))}
            </div>
          </div>
          <div className='post-content'>
            <div className='post-title'>
              <div className='username'>{post.user_id.username}</div>
              <div>{post.title}</div>
            </div>
            <p>{post.description}</p>
            <p>posted on {convertDate(post.created_at)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Posts;
