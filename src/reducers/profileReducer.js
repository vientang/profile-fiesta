import actionTypes from '../constants'

let defaultState = {
  list: [],
  selectedProfile: null
}

export default (state = defaultState, action) => {
  let updatedState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.PROFILES_RECEIVED:
      // console.log('PROFILES_RECEIVED :', JSON.stringify(action.profiles))
      updatedState['list'] = action.profiles
      if (action.profiles.length > 0) {
        updatedState['selectedProfile'] = action.profiles[0]
      }
      return updatedState
    case actionTypes.PROFILE_CREATED:
      let updatedList = Object.assign([], updatedState.list)
      updatedList.push(action.profile)
      updatedState['list'] = updatedList
      return updatedState
    case actionTypes.PROFILE_SELECTED:
      updatedState['selectedProfile'] = action.profile
      return updatedState
    default:
      return state
  }
}
