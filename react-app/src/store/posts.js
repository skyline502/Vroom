const GET_POSTS = 'posts/GET_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
const DELETE_POST = 'posts/DELETE_POST';
const SET_POST = 'posts/SET_POST';
const EDIT_POST = 'posts/EDIT_POST';
const GET_ONE_POST = 'posts/GET_ONE_POST';
const CREATE_LIKE = 'posts/CREATE_LIKE'

const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
});

const getAPost = (post_id) => ({
  type: GET_ONE_POST,
  post_id
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

const createLike = (post) => ({
  type: CREATE_LIKE,
  post
});
//getPosts

export const getAllPosts = () => async dispatch => {
  const response = await fetch('/api/posts/');
  if (response.ok) {
    const posts = await response.json();
    dispatch(getPosts(posts));
    return posts;
  }

  return response;
}

export const getOnePost = (post_id) => async dispatch => {

  const response = await fetch(`/api/posts/${post_id}`);
  if (response.ok) {
    const post = await response.json();
    dispatch(getAPost(post));
    return post;
  }

  return response;
}

//createPost
export const createAPost = (form) => async dispatch => {
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
  });

  const post = await response.json();

  dispatch(deletePost(post));
}

export const editAPost = (post) => async dispatch => {
  let id = post.get('id');
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

export const createALike = (like) => async dispatch => {
  const response = await fetch(`/api/posts/${post.id}/like`, {
    method: 'POST',
    body: like
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createLike(data));
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


//sorting function
const sort_posts = array => {
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
      newState.current = {...action.post};
      return newState;
    }
    case GET_ONE_POST: {
      newState = {...state};
      newState.current = {...action.post};
      return newState;
    }
    case CREATE_LIKE: {
      newState = {...state};
      return newState;
    }
    default:
      return state;
  }
}

export default postReducer;
