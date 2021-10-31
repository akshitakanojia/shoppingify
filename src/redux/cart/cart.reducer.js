import cartActionTypes from "./cart.types";
import { addItemToCart, removeItemFromCart, toggleCheck } from './cart.utils'

const INITIAL_STATE = {
  name: 'Shopping List',
  cartItems: [],
  lists: null,
  saveListStart: false,
  saveListError: false,
  getListStart: false,
  getListError: false
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      }
    case cartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      }
    case cartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItem => cartItem.item._id !== action.payload._id)
      }
    case cartActionTypes.TOGGLE_CHECK:
      return {
        ...state,
        cartItems: toggleCheck(state.cartItems, action.payload)
      }
    case cartActionTypes.SAVE_LIST_NAME:
      return {
        ...state,
        name: action.payload
      }
    case cartActionTypes.SAVE_LIST_START:
      return {
        ...state,
        saveListStart: true,
        saveListError: false
      }
    case cartActionTypes.SAVE_LIST_SUCCESS:
      return {
        ...state,
        saveListStart: false,
        lists: [...state.lists, action.payload],
        name: 'Shopping List',
        cartItems: []
      }
    case cartActionTypes.SAVE_LIST_ERROR:
      return {
        ...state,
        saveListStart: false,
        saveListError: true
      }
    case cartActionTypes.GET_LIST_START:
      return {
        ...state,
        getListStart: true,
        getListError: false
      }
    case cartActionTypes.GET_LIST_SUCCESS:
      return {
        ...state,
        getListStart: false,
        lists: action.payload.reverse()
      }
    case cartActionTypes.GET_LIST_ERROR:
      return {
        ...state,
        getListStart: false,
        getListError: true
      }
    case cartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      }
    default:
      return state
  }
}

export default cartReducer