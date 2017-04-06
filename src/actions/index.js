import actionTypes from '../constants'

export default {
  profilesReceived: (profiles) => {
    return {
      type: actionTypes.PROFILES_RECEIVED,
      profiles
    }
  }
}
