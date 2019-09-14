import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.AUTH_SUCCESS) {
     console.log("Success");
    return {
      ...state,
      token: action.token,
      userId: action.userId,
      loading: true
    }
  }
  if (action.type === actionTypes.AUTH_FAIL) {
    console.log('Fail');
    return {
      ...state,
      error: action.error
    }
  }
  return state;
}

export default reducer;