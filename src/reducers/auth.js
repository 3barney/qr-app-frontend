import * as actionTypes from '../actions/actionTypes';
import * as actionThunks from '../thunk/authentication';

const initialState = {
  token: null,
  error: null,
  userLoading: false,
  authRedirectPath: '/',
  authUser: null,
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_SET:
      return applySetAuthUser(state, action)

    case actionTypes.LOGIN_START:
      return actionThunks.authStart(state, action);

    case actionTypes.LOGIN_SUCCESS:
      return actionThunks.authSuccess(state, action);

    case actionTypes.LOGIN_FAIL:
      return actionThunks.authFail(state, action);

    case actionTypes.LOGOUT:
      return actionThunks.authLogout(state, action);

    case actionTypes.REGISTER_START:
      return actionThunks.registerStart(state, action);

    case actionTypes.REGISTER_SUCCESS:
      return actionThunks.registerSuccess(state, action);

    case actionTypes.REGISTER_FAIL:
      return actionThunks.registerFail(state, action);

    default:
      return state;
  }
};

export default reducer;
