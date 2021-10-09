import authActionTypes from "./auth.types";

const INITIAL_STATE = {
  signupStart: false,
  signupError: false,
  token: null,
  userExist: false,
  signinStart: false,
  signinError: false,
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authActionTypes.SIGN_UP_START:
      return {
        ...state,
        signupStart: true,
        signupError: false,
        userExist: false,
        token: null
      }
    case authActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signupStart: false,
        token: action.payload
      }
    case authActionTypes.SIGN_UP_ERROR:
      return {
        ...state,
        signupStart: false,
        signupError: true
      }
    case authActionTypes.SIGN_UP_USER_EXIST:
      return {
        ...state,
        signupStart: false,
        signupError: true,
        userExist: true
      }
    case authActionTypes.SIGN_IN_START:
      return {
        ...state,
        signinStart: true,
        signinError: false,
        token: null
      }
    case authActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signinStart: false,
        token: action.payload
      }
    case authActionTypes.SIGN_IN_ERROR:
      return {
        ...state,
        signinStart: false,
        signinError: action.payload
      }
    case authActionTypes.ERROR_RESET:
      return {
        ...state,
        signupError: false,
        userExist: false,
        signinError: false
      }
    case authActionTypes.LOG_OUT:
      return INITIAL_STATE
    default:
      return state
  }
}

export default authReducer