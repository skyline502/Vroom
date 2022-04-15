const GET_COMMENTS = 'comments/GET_COMMENTS';

const getComments = (comments) => ({
  type: GET_COMMENTS,
  comments
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


const commentsReducer = (state = {comments: [], current: {}}, action) => {
  switch(action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: [...action.comments.comments]
      }
    default:
      return state;
  }
}

export default commentsReducer;
