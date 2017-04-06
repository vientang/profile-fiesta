import actionTypes from '../constants'

let defaultState = {
  list: []
}

export default (state = defaultState, action) => {
  let updatedState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.PROFILES_RECEIVED:
    	console.log('PROFILES_RECEIVED :', JSON.stringify(action.profiles))
    	updatedState['list'] = action.profiles
      return updatedState
    default:
      return state
  }
}
