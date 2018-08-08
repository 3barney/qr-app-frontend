import axios from 'axios';
import * as actionConstants from '../actions/actionTypes';

export const authStart = (state, action) => {
  return Object.assign({}, state, { error: null, userLoading: true });
};

export const authSuccess = (state, action) => {
  return Object.assign({}, state, {
    token: action.token,
    error: null,
    userLoading: false,
  });
};

export const authFail = (state, payload) => {
  return Object.assign({}, state, {
    error: payload,
    userLoading: false,
  });
};

export const authLogout = (state, action) => {
  return (state, { token: null, userId: null });
};

export const registerStart = (state, action) => {
  return Object.assign({}, state, { error: null, userLoading: true });
};

export const registerSuccess = (state, action) => {
  return Object.assign({}, state, {
    token: action.token,
    error: null,
    userLoading: false,
  });
};

export const registerFail = (state, action) => {
  return Object.assign({}, state, {
    error: action.error,
    userLoading: false,
  });
};

export const loginUser = (username, password) => (dispatch, getState) => {
  if (username.length && password.length) {
    dispatch({ type: actionConstants.LOGIN_START });
    const userDetails = { username, password };
    const { app } = getState();
    axios.post(`${app.apiUrl}/login`, userDetails)
      .then((response) => {
        if (response.status === 200) {
          if (Object.prototype.hasOwnProperty.call(response, 'data')) {
            const { data } = response;
            if (Object.prototype.hasOwnProperty.call(data, 'Failed')) {
              dispatch({ type: actionConstants.LOGIN_FAIL, payload: data.Failed });
            }
          }
        }
        console.log("Resp", response);
      })
      .catch((err) => {
        console.log(err)
      });
    // axios.post(`${app.appUrl}/auth/login/`, authData)
    // .then((response) => {
    //   console.log(response);
    //   localStorage.setItem('token', response.data.token);
    //   dispatch(authSuccess(response.data.token));
    // })
    // .catch((err) => {
    //   console.log(err);
    //   dispatch(authFail(err.response.data.error));
    // });

  }
  
}

export const registerUser = (userDetails) => (dispatch, getState) => {}
