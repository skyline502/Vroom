const GET_POSTS = 'posts/GET_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
const DELETE_POST = 'posts/DELETE_POST';
const SET_POST = 'posts/SET_POST';
const EDIT_POST = 'posts/EDIT_POST';

const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
});

const createPost = (post) => ({
  type:CREATE_POST,
  post
});

const deletePost = (post_id) => ({
  type:DELETE_POST,
  post_id
});

export const setPost = (post) => ({
  type: SET_POST,
  post
});

const editPost = (post) => ({
  type: EDIT_POST,
  post
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

//createPost
export const createAPost = (form) => async dispatch => {

  console.log(form, 'are there any images............')

  const response = await fetch('/api/posts/', {
    method: 'POST',
    body: form,
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

export const deleteAPost = (post_id) => async dispatch => {
  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE',
  })

  const post = await response.json();

  dispatch(deletePost(post));
}

export const editAPost = (post) => async dispatch => {
  console.log('edit a post in the store....',post.get('id'))

  let id = post.get('id');
  console.log('can i get the id....', id)
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: post,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editPost(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
    }

}

const sort_posts = array => {
  console.log(array, 'is this an array?')
  const posts = {};
  array.forEach(post => {
    posts[post.id] = post
  });
  return posts;
}


const postReducer = (state = {posts: [], current: {}}, action) => {
  let newState = {...state}
  switch(action.type) {
    case GET_POSTS:
      return {
        ...state,
        ...sort_posts(action.posts.posts),
        posts: [...action.posts.posts]
      }
    case CREATE_POST: {
      newState = {...state};
      return newState;
    }
    case DELETE_POST: {
      delete newState[action.post_id.post_id];
      newState.posts.splice(newState.posts.findIndex(post => post.id === action.post_id.post_id),1);
      newState.posts = [...newState.posts]
      return newState
    }
    case SET_POST: {
      newState = {...state};
      newState.current = action.post;
      return newState;
    }
    default:
      return state;
  }
}

export default postReducer;
