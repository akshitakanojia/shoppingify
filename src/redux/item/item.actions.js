import itemActionTypes from './item.types'
import axios from 'axios'

const addItemStart = () => ({
  type: itemActionTypes.ADD_ITEM_START
})
const addtemsSuccess = (item) => ({
  type: itemActionTypes.ADD_ITEM_SUCCESS,
  payload: item
})
const addItemsError = (error) => ({
  type: itemActionTypes.ADD_ITEM_ERROR,
  payload: error
})

export const addItem = (item) => {
  return (dispatch, getState) => {
    dispatch(addItemStart())
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/items`,
      method: 'POST',
      data: item,
      headers: { 'Authorization': `Bearer ${getState().auth.token}` }
    })
      .then(response => {
        const item = response.data
        dispatch(addtemsSuccess(item))
      })
      .catch(error => {
        const errorMessage = error.message
        dispatch(addItemsError(errorMessage))
      })
  }
}

const fetchItemsStart = () => ({
  type: itemActionTypes.FETCH_ITEM_START
})

const fetchItemsSuccess = (items) => ({
  type: itemActionTypes.FETCH_ITEM_SUCCESS,
  payload: items
})

const fetchItemsError = (error) => ({
  type: itemActionTypes.FETCH_ITEM_ERROR,
  payload: error
})

export const fetchItems = () => {
  return (dispatch, getState) => {
    dispatch(fetchItemsStart())
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/items`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${getState().auth.token}` }
    })
      .then(response => {
        const items = response.data
        dispatch(fetchItemsSuccess(items))
      })
      .catch(error => {
        const errorMessage = error.message
        dispatch(fetchItemsError(errorMessage))
      })
  }
}

// EDIT ITEM
const editItemStart = () => ({
  type: itemActionTypes.EDIT_ITEM_START
})
const editItemSuccess = (item) => ({
  type: itemActionTypes.EDIT_ITEM_SUCCESS,
  payload: item
})
const editItemError = (error) => ({
  type: itemActionTypes.EDIT_ITEM_ERROR,
  payload: error
})

export const editItem = (data, id) => {
  return (dispatch, getState) => {
    dispatch(editItemStart())
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/items/${id}`,
      method: 'PATCH',
      data: data,
      headers: { 'Authorization': `Bearer ${getState().auth.token}` }
    })
      .then(response => dispatch(editItemSuccess(response.data)))
      .catch(error => dispatch(editItemError(error)))
  }
}