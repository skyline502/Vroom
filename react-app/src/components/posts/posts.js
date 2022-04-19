import './Posts.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../store/posts';
import { useEffect } from 'react';
import { showModal, setCurrentModal } from '../../store/modal';
import { setPost, getOnePost } from '../../store/posts';
import { getPostComments } from '../../store/comments';
import SinglePost from './single-post';

const Posts = () => {
  const posts = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const showSinglePost = async (post) => {
    let onePost = await dispatch(getOnePost(post.id));
    dispatch(setPost(onePost));
    if (onePost) {
      await getPostComments(onePost.post.id);
      dispatch(setCurrentModal(SinglePost));
      dispatch(showModal());
    }
  }

  return (
    <div className='posts-container'>
      <div className='tile-posts-container'>
        {posts?.map(post => (
          <div key={post.id} className='post-preview'>
            <img src={post.images[0].url} alt='preview-pic' />
            {post?.images?.length > 1 ?
              <div className='posts-test'>
                <i className="fas fa-clone"></i>
              </div>:<></>
            }
            <div className='comments-tiles' onClick={() => showSinglePost(post)}>
              <i className="fas fa-heart" />
              <p>{post.likes?.length}</p>
              <i className="fas fa-comment"></i>
              <p>{post.comments?.length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Posts;
