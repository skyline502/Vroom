// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const FOLLOW_USER = 'session/FOLLOW_USER';
const GET_FOLLOWED = 'session/GET_FOLLOWED';


const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const followUser = (user) => ({
  type: FOLLOW_USER,
  user
});

const getFollowedPosts = (user) => ({
  type: GET_FOLLOWED,
  user
});

export const getFollowed = (user) => async dispatch => {
  const response = await fetch(`/api/users/${user.id}/follows`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getFollowedPosts(data));
    return null;
  }
}

export const followThisUser = (id) => async dispatch => {
  const response = await fetch(`/api/users/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(followUser(data));
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

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
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

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (name, username, email, password, confirm, profile_pic) => async (dispatch) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("password", password);
  formData.append('email', email)
  formData.append("confirm", confirm);
  formData.append("profile_pic", profile_pic)

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
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

export default function reducer(state = {user: null, followed: []}, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case GET_FOLLOWED:
      return {
        ...state,
        followed: [...action.user.followed_posts]
      }
    default:
      return state;
  }
}
