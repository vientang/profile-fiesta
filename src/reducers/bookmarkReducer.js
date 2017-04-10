import actionTypes from '../constants'

let defaultState = {
  // all: []
}

export default (state = defaultState, action) => {
  let updatedState = Object.assign({}, state)
  switch (action.type) {
    case actionTypes.GET_BOOKMARKS:
      // updatedState['all'] = action.bookmarks
      // make key/value pairs out of profile id and it's bookmarks
      const params = action.params
      const keys = Object.keys(params)
      // update the value of each Id with it's unique bookmarks
      keys.forEach((key, i) => {
        let value = params[key]
        updatedState[value] = action.bookmarks
      })
      return updatedState

    case actionTypes.SAVE_BOOKMARK:
      let list = (updatedState[action.bookmark.profile]) ? updatedState[action.bookmark.profile] : []
      list.push(action.bookmark)
      updatedState[action.bookmark.profile] = list
      return updatedState

    default:
      return state
  }
}
