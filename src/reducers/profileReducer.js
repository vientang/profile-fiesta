import actionTypes from '../constants'

let defaultState = {
  list: []
}

export default (state = defaultState, action) => {
  let updatedState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.PROFILES_RECEIVED:
      // console.log('PROFILES_RECEIVED :', JSON.stringify(action.profiles))
      updatedState['list'] = action.profiles
      return updatedState
    case actionTypes.PROFILE_CREATED:
      // console.log('PROFILE_CREATED :', JSON.stringify(action.profile))
      let updatedList = Object.assign([], updatedState.list)
      updatedList.push(action.profile)
      updatedState['list'] = updatedList
      return updatedState
    default:
      return state
  }
}
