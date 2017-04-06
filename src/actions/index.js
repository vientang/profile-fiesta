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
  }
}
