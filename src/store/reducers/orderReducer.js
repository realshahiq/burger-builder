import * as actionTypes from '../actions/actionTypes';
const initialState = {
  loading: false
}
const reducer = (state = initialState, action) => {
  if (action.type === 'ORDER') {
    return {
      ...state,
      loading: action.value
    }
  }
  return state;
}

export default reducer;