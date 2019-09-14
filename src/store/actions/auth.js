import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: idToken,
    userId: localId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message
  }
}
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('localId');
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
          localStorage.setItem('token', response.data.idToken);
          localStorage.setItem('localId', response.data.localId);
          dispatch(authSuccess(response.data.idToken, response.data.localId));
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
export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('localId');
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, userId));
    }
  }
}