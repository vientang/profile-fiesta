import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { APIManager } from '../../utils'
import actions from '../../actions'

class Profiles extends Component {
  constructor () {
    super ()
    this.selectProfile = this.selectProfile.bind(this)
  }

  componentDidMount () {
    APIManager.get('/api/profile', null, (err, response) => {
      if (err) {
        console.log(err)
      }
      const results = response.results
      this.props.profilesReceived(results)
    })
  }

  selectProfile (event) {
    event.preventDefault()
    const selectedId = event.target.dataset.id
    let selectedProfile;
    this.props.profiles.forEach(profile => {
      if (profile.id === selectedId) {
        selectedProfile = profile
        return
      }
    })
    this.props.profileSelected(selectedProfile)
  }

  render () {
    const list = this.props.profiles.map((profile, i) => {
      return (
        <li
          key={profile.id}
          data-id={profile.id} 
          onClick={this.selectProfile}>
          { profile.firstName }
        </li>
      )
    })
    return (
      <div>
        <h1>Profiles</h1>
        <ol> { list } </ol>
      </div>
    )
  }
}

Profiles.propTypes = {
  profiles: PropTypes.array,
  selectedProfile: PropTypes.object,
  profilesReceived: PropTypes.func,
  profileSelected: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profile.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    profilesReceived: (profiles) => dispatch(actions.profilesReceived(profiles)),
    profileSelected: (profile) => dispatch(actions.profileSelected(profile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
