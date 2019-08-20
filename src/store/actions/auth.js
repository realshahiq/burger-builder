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
    authData: authData
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
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
        console.log(response);
        dispatch(authSuccess(response.data));
      }).catch(error => {
        console.log(error.response);
        dispatch(authFail(error));
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