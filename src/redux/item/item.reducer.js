import itemActionTypes from "./item.types"

const INITIAL_STATE = {
  items: [],
  add_item_start:false,
  add_item_error:null,
  fetch_item_start:false,
  fetch_item_error:null
}

const itemReducer = (state = INITIAL_STATE,action) => {
  switch(action.type){
    case itemActionTypes.ADD_ITEM_START:
      return {
        ...state,
        add_item_start:true,
        add_item_error:null
      }
    case itemActionTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        add_item_start:false,
        items:[...state.items,action.payload]
      }

    case itemActionTypes.ADD_ITEM_ERROR:
      return {
        ...state,
        add_item_start:false,
        add_item_error:action.payload
      }

    case itemActionTypes.FETCH_ITEM_START:
      return {
        ...state,
        fetch_item_start:true,
        fetch_item_error:null
      }

    case itemActionTypes.FETCH_ITEM_SUCCESS:
      return {
        ...state,
        fetch_item_start:false,
        items:action.payload
      }

    case itemActionTypes.FETCH_ITEM_ERROR:
      return {
        ...state,
        fetch_item_start:false,
        fetch_item_error:action.payload
      }

    default:
      return state
  }
}

export default itemReducer