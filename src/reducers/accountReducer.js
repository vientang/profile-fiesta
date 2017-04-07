import actionTypes from '../constants'

let defaultState = {
  currentUser: null
}

export default (state = defaultState, action) => {
  let updatedState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.PROFILE_CREATED:
      updatedState['currentUser'] = action.profile
      return updatedState
    case actionTypes.CURRENT_USER_RECEIVED:
      updatedState['currentUser'] = action.profile
      return updatedState
    case actionTypes.CURRENT_USER_LOGGEDOUT:
      updatedState['currentUser'] = action.profile
      return updatedState
    default:
      return state
  }
}
