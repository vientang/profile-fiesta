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
  currentUserReceived: (profile) => {
    return {
      type: actionTypes.CURRENT_USER_RECEIVED,
      profile
    }
  }
}
