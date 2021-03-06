import axios from "axios";
import { toast } from "react-toastify";
import cartActionTypes from "./cart.types";

export const addItem = (item) => {
  return dispatch => {
    dispatch({
      type: cartActionTypes.ADD_ITEM,
      payload: item
    });
    toast.success(`${item.name} added to cart`, { position: toast.POSITION.TOP_LEFT, autoClose: 1000 })
  }
}

export const removeItem = (item) => ({
  type: cartActionTypes.REMOVE_ITEM,
  payload: item
})

export const clearItem = (item) => {
  return dispatch => {
    dispatch({
      type: cartActionTypes.CLEAR_ITEM_FROM_CART,
      payload: item
    });
    toast.success(`${item.name} removed from cart`, { position: toast.POSITION.TOP_LEFT, autoClose: 1000 })
  }
}

export const toggleCheck = (item) => ({
  type: cartActionTypes.TOGGLE_CHECK,
  payload: item
})

export const saveListName = (name) => ({
  type: cartActionTypes.SAVE_LIST_NAME,
  payload: name
})

const saveListStart = () => ({
  type: cartActionTypes.SAVE_LIST_START
})
const saveListSuccess = (list) => ({
  type: cartActionTypes.SAVE_LIST_SUCCESS,
  payload: list
})
const saveListError = () => ({
  type: cartActionTypes.SAVE_LIST_ERROR
})

export const saveList = (status) => {
  return (dispatch, getState) => {
    let items = getState().cart.cartItems
    let name = getState().cart.name

    dispatch(saveListStart())
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/lists`,
      method: 'POST',
      data: { name, items, status },
      headers: { 'Authorization': `Bearer ${getState().auth.token}` }
    }).then((response) => {
      dispatch(saveListSuccess(response.data))
    })
      .catch(error => {
        console.log(error)
        dispatch(saveListError())
      })
  }
}

const getListStart = () => ({
  type: cartActionTypes.GET_LIST_START
})
const getListSuccess = (lists) => ({
  type: cartActionTypes.GET_LIST_SUCCESS,
  payload: lists
})
const getListError = () => ({
  type: cartActionTypes.GET_LIST_ERROR
})

export const getList = () => {
  return (dispatch, getState) => {
    dispatch(getListStart())
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/lists`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${getState().auth.token}` }
    })
      .then(response => {
        dispatch(getListSuccess(response.data))
      })
      .catch(error => {
        dispatch(getListError())
      })
  }
}

export const clearCart = () => ({
  type: cartActionTypes.CLEAR_CART
})

