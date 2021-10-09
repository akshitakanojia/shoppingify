import rightpanelActions from "./rightpanel.types";

const INITIAL_STATE = {
  panel_state : 'list',
  id : null
}

const rightpanelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case rightpanelActions.CHANGE_STATE:
      return {
        ...state,
        panel_state : action.payload,
        id : action.id
      }
    default:
      return state
  }
}

export default rightpanelReducer