const GET_COMMENTS = 'comments/GET_COMMENTS';
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';

const getComments = (comments) => ({
  type: GET_COMMENTS,
  comments
});

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment
});

const deleteComment = (comment_id) => ({
  type: DELETE_COMMENT,
  comment_id
})

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment
});

export const getAllComments = () => async dispatch => {
  const response = await fetch(`/api/comments/`)
  if (response.ok) {
    const comments = await response.json();
    dispatch(getComments(comments));
    console.log('comments...in store,', comments);
    return comments;
  }

  return response;
}

export const createAComment = (comment) => async dispatch => {
  console.log('I have reached the store for create a comment....')
  const response = await fetch(`/api/comments/`, {
    method: 'POST',
    body: comment,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createComment(data));
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

export const deleteAComment = (comment_id) => async dispatch => {
  console.log('delete a comment is inside the store...', comment_id)
  const response = await fetch(`/api/comments/${comment_id}`, {
    method: 'DELETE',
  });

  const comment = await response.json();

  dispatch(deleteComment(comment));
}

export const editAComment = (comment) => async dispatch => {
  console.log('edit a comment is in the store....', comment.get('comment_id'))

  let comment_id = comment.get('comment_id');
  console.log(comment_id, 'this is the comment id................')
  const response = await fetch(`/api/comments/${comment_id}`, {
    method: 'PUT',
    body: comment,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editComment(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred.  Please try again.']
  }
}

const sort_comments = array => {
  console.log(array, 'is this an array?')
  const comments = {};
  array.forEach(comment => {
    comments[comment.id] = comment
  });
  return comments;
}

const commentsReducer = (state = {comments: [], current: {}}, action) => {
  let newState = {...state}

  switch(action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        ...sort_comments(action.comments.comments),
        comments: [...action.comments.comments]
      }
    case CREATE_COMMENT:
    return {
      ...state,
      comments: [action.comment, ...state.comments]
    }
    case DELETE_COMMENT:
      delete newState[action.comment_id.comment_id];
      newState.comments.splice(newState.comments.findIndex(comment => comment.id === action.comment_id.comment_id),1);
      newState.comments = [...newState.comments]
      return newState
    case EDIT_COMMENT:
      return {
        ...state,
      }
    default:
      return state;
  }
}

export default commentsReducer;
