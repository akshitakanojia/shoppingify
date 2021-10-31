import itemActionTypes from "./item.types"
import { updateItems } from "./item.utils"

const INITIAL_STATE = {
  items: [],
  add_item_start: false,
  add_item_error: null,
  fetch_item_start: false,
  fetch_item_error: null,
  edit_item_start: false,
  edit_item_error: false
}

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case itemActionTypes.ADD_ITEM_START:
      return {
        ...state,
        add_item_start: true,
        add_item_error: null
      }
    case itemActionTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        add_item_start: false,
        items: [...state.items, action.payload]
      }

    case itemActionTypes.ADD_ITEM_ERROR:
      return {
        ...state,
        add_item_start: false,
        add_item_error: action.payload
      }

    case itemActionTypes.FETCH_ITEM_START:
      return {
        ...state,
        fetch_item_start: true,
        fetch_item_error: null
      }

    case itemActionTypes.FETCH_ITEM_SUCCESS:
      return {
        ...state,
        fetch_item_start: false,
        items: action.payload
      }

    case itemActionTypes.FETCH_ITEM_ERROR:
      return {
        ...state,
        fetch_item_start: false,
        fetch_item_error: action.payload
      }
    case itemActionTypes.EDIT_ITEM_START:
      return {
        ...state,
        edit_item_start: true,
        edit_item_error: false
      }
    case itemActionTypes.EDIT_ITEM_SUCCESS:
      return {
        ...state,
        edit_item_start: false,
        items: updateItems(state.items, action.payload)
      }
    case itemActionTypes.EDIT_ITEM_ERROR:
      return {
        ...state,
        edit_item_start: false,
        edit_item_error: true
      }
    default:
      return state
  }
}

export default itemReducer