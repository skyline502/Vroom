const GET_POSTS = 'posts/GET_POSTS'
const CREATE_POST = 'posts/CREATE_POST'

const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
});

const createPost = (post) => ({
  type:CREATE_POST,
  post
})

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

//createPost
export const createAPost = (post) => async dispatch => {
  console.log('...store post from front end', post)

  const formData = new FormData();
  formData.append('title', post.title);
  formData.append('description', post.description);
  formData.append('user_id', post.user_id);
  formData.append('images', post.images)

  console.log('....store create a post', formData)
  const response = await fetch('/api/posts/', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createPost(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
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
