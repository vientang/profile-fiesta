import actionTypes from '../constants'

let defaultState = {
  all: []  
}

export default (state = defaultState, action) => {
  let updatedState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.GET_BOOKMARKS:
      updatedState['all'] = action.bookmarks
      return updatedState
    case actionTypes.SAVE_BOOKMARK:
      console.log('SAVE_BOOKMARK :', JSON.stringify(action.bookmark))
      // updatedState['bookmarks'].push(action.bookmark)
      // return updatedState
    default:
      return state
  }
}
