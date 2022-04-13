const GET_POSTS = 'posts/GET_POSTS'

const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
});

//getPosts

export const getAllPosts = () => async dispatch => {
  const response = await fetch('/api/posts/');
  console.log('posts in store', response)
  if (response.ok) {
    const posts = await response.json();
    dispatch(getPosts(posts));
    return posts;
  }


  return response;
}

const initialState = {posts: [] }

const postReducer = (state = initialState, action) => {
  let newstate;

  switch(action.type) {
    case GET_POSTS: {
      const allPosts = {};
      action.posts.forEach(post => {
        allPosts[post.id] = post;
      });
      return {
        ...allPosts,
        ...state
      }
    }
    default:
      return state;
  }
}

export default postReducer;
