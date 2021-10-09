import axios from "axios";
import authActionTypes from "./auth.types";

const signupStart = () => ({
  type: authActionTypes.SIGN_UP_START
})
const signupSuccess = (token) => ({
  type: authActionTypes.SIGN_UP_SUCCESS,
  payload: token
})
const signupError = () => ({
  type: authActionTypes.SIGN_UP_ERROR
})
const sinupUserAlreadyExist = () => ({
  type: authActionTypes.SIGN_UP_USER_EXIST
})

export const signUp = (email, password) => {
  return dispatch => {
    dispatch(signupStart())
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/users`,
      method: 'POST',
      data: { email, password }
    })
      .then(response => {
        dispatch(signupSuccess(response.data.token))
      })
      .catch(error => {
        (error?.response?.data?.code === 11000) && dispatch(sinupUserAlreadyExist())
        dispatch(signupError(error))
      })
  }
}

const signinStart = () => ({
  type: authActionTypes.SIGN_IN_START
})
const signinSuccess = (token) => ({
  type: authActionTypes.SIGN_IN_SUCCESS,
  payload: token
})
const signinError = (error) => ({
  type: authActionTypes.SIGN_IN_ERROR,
  payload: error
})

export const signIn = (email, password) => {
  return dispatch => {
    dispatch(signinStart())
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      method: 'POST',
      data: { email, password }
    })
      .then(response => {
        dispatch(signinSuccess(response.data.token))
      })
      .catch(error => {
        if (error.response.status === 401) {
          return dispatch(signinError("Invalid username/password"))
        }
        dispatch(signinError("Unable to login. Please try again"))
      })
  }
}

const logout = () => ({
  type: authActionTypes.LOG_OUT
})

export const logoutAsync = () => {
  return (dispatch, getState) => {
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getState().auth.token}` }
    })
      .then(response => {
      })
      .catch(error => {
      })
    dispatch(logout())
  }
}

export const errorReset = () => ({
  type: authActionTypes.ERROR_RESET
})