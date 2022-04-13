
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAllPosts } from '../../store/posts';
import { useEffect } from 'react';

const Posts = () => {
  // const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user);
  const posts = useSelector(state => state.posts)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])


  console.log(posts, 'posts.....')

  return (
    <h1>Posts Page</h1>
  )
}

export default Posts;
