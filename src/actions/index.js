import actionTypes from '../constants'

export default {
  profilesReceived: (profiles) => {
    return {
      type: actionTypes.PROFILES_RECEIVED,
      profiles
    }
  },
  profileCreated: (profile) => {
    return {
      type: actionTypes.PROFILE_CREATED,
      profile
    }
  },
  profileSelected: (profile) => {
    return {
      type: actionTypes.PROFILE_SELECTED,
      profile
    }
  },
  currentUserReceived: (profile) => {
    return {
      type: actionTypes.CURRENT_USER_RECEIVED,
      profile
    }
  },
  currentUserLoggedout: (profile) => {
    return {
      type: actionTypes.CURRENT_USER_LOGGEDOUT,
      profile
    }
  },
  saveBookmark: (bookmark) => {
    return {
      type: actionTypes.SAVE_BOOKMARK,
      bookmark
    }
  },
  getBookmarks: (bookmarks, params) => {    
    return {
      type: actionTypes.GET_BOOKMARKS,
      bookmarks,
      params
    }
  }
}
