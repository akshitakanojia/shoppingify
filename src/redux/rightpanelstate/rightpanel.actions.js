import rightpanelActions from "./rightpanel.types";

export const changeState = (state, id) => ({
  type: rightpanelActions.CHANGE_STATE,
  payload: state,
  id: id
})

export const togglePanel = () => ({
  type: rightpanelActions.TOGGLE_PANEL
})