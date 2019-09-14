import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.AUTH_SUCCESS) {
    return {
      ...state,
      token: action.token,
      userId: action.userId,
      loading: true
    }
  }
  if (action.type === actionTypes.AUTH_FAIL) {
    return {
      ...state,
      error: action.error
    }
  }
  if (action.type === actionTypes.AUTH_LOGOUT) {
    return {
      ...state,
      userId: null,
      token: null
    }
  }
  return state;
}

export default reducer;