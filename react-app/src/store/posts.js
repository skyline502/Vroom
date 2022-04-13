const GET_POSTS = 'posts/GET_POSTS'

const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
});

//getPosts

export const getAllPosts = () => async dispatch => {
  const response = await fetch('/api/posts/');
  if (response.ok) {
    const posts = await response.json();
    dispatch(getPosts(posts));
    console.log('posts....in store', posts)
    return posts;
  }


  return response;
}

const initialState = {posts: {} }

const postReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case GET_POSTS: {
      newState = {posts: {...action.posts}}
      return newState;
    }
    default:
      return state;
  }
}

export default postReducer;
