import axios from "axios";
import { clearCart } from "../cart/cart.actions";
import authActionTypes from "./auth.types";


// SIGN UP
const signupStart = () => ({
  type: authActionTypes.SIGN_UP_START
})
const signupSuccess = (userData) => ({
  type: authActionTypes.SIGN_UP_SUCCESS,
  payload: userData
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
        dispatch(signupSuccess(response.data))
      })
      .catch(error => {
        (error?.response?.data?.code === 11000) && dispatch(sinupUserAlreadyExist())
        dispatch(signupError(error))
      })
  }
}

// SIGN IN
const signinStart = () => ({
  type: authActionTypes.SIGN_IN_START
})
const signinSuccess = (userData) => ({
  type: authActionTypes.SIGN_IN_SUCCESS,
  payload: userData
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
        dispatch(signinSuccess(response.data))
      })
      .catch(error => {
        if (error.response.status === 401) {
          return dispatch(signinError("Invalid username/password"))
        }
        dispatch(signinError("Unable to login. Please try again"))
      })
  }
}

// LOGOUT
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
    dispatch(clearCart())
  }
}

// LOGOUT ALL SESSIONS
const logoutAll = () => ({
  type: authActionTypes.LOG_OUT_ALL
})

export const logoutAllAsync = () => {
  return (dispatch, getState) => {
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/users/logoutall`,
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getState().auth.token}` }
    })
      .then(response => {
      })
      .catch(error => {
      })
    dispatch(logoutAll())
    dispatch(clearCart())
  }
}

// ERROR RESET
export const errorReset = () => ({
  type: authActionTypes.ERROR_RESET
})

//FETCH USER
const fetchUserStart = () => ({
  type: authActionTypes.FETCH_USER_START
})
const fetchUserSuccess = (user) => ({
  type: authActionTypes.FETCH_USER_SUCCESS,
  payload: user
})
const fetchUserError = (error) => ({
  type: authActionTypes.FETCH_USER_ERROR,
  payload: error
})

export const fetchUser = () => {
  return (dispatch, getState) => {
    dispatch(fetchUserStart());
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/users/me`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${getState().auth.token}` }
    })
      .then(response => dispatch(fetchUserSuccess(response.data)))
      .catch(error => dispatch(fetchUserError(error)))
  }
}
