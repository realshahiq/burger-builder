import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.AUTH_SUCCESS) {
     console.log(action.userId);
    return {
      ...state,
      token: action.token,
      userId: action.userId
    }
  }
  return state;
}

export default reducer;