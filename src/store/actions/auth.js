import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authData.idToken,
    userId: authData.localId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message
  }
}
export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}
export const auth = (username, password, check_signin) => {
  return dispatch => {
    const user = {
      email: username,
      password: password,
      returnSecureToken: true
    }
    if (check_signin) {
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXDPckbKGUM_PhZHFgofklFBFVvpkXVtg', user)
        .then(response => {
          dispatch(authSuccess(response.data));
        }).catch(error => {
          dispatch(authFail(error.response.data.error));
        })
    } else {
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXDPckbKGUM_PhZHFgofklFBFVvpkXVtg', user)
        .then(response => {
          dispatch(authSuccess(response.data));
        }).catch(error => {
          dispatch(authFail(error));
        })
    }
  }
}