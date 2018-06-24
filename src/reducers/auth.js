import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

const authStart = (state, action) => {
  return Object.assign({}, state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return Object.assign({}, state, {
    token: action.token,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return Object.assign({}, state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return (state, { token: null, userId: null });
};

const registerStart = (state, action) => {
  return Object.assign({}, state, { error: null, loading: true });
};

const registerSuccess = (state, action) => {
  return Object.assign({}, state, {
    token: action.token,
    error: null,
    loading: false,
  });
};

const registerFail = (state, action) => {
  return Object.assign({}, state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return authStart(state, action);

    case actionTypes.LOGIN_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.LOGIN_FAIL:
      return authFail(state, action);

    case actionTypes.LOGOUT:
      return authLogout(state, action);

    case actionTypes.REGISTER_START:
      return registerStart(state, action);

    case actionTypes.REGISTER_SUCCESS:
      return registerSuccess(state, action);

    case actionTypes.REGISTER_FAIL:
      return registerFail(state, action);

    default:
      return state;
  }
};

export default reducer;
