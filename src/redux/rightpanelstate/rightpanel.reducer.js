import rightpanelActions from "./rightpanel.types";

const INITIAL_STATE = {
  panel_state: 'list',
  id: null,
  panelOpen: false
}

const rightpanelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case rightpanelActions.CHANGE_STATE:
      return {
        ...state,
        panel_state: action.payload,
        id: `${action.id ? action.id : state.id}`
      }
    case rightpanelActions.TOGGLE_PANEL:
      return {
        ...state,
        panelOpen: !state.panelOpen
      }
    default:
      return state
  }
}

export default rightpanelReducer