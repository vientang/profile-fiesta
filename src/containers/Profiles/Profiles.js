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
        return new Error(err)
      }
      const results = response.results
      this.props.profilesReceived(results)
    })
  }

  selectProfile (profile, event) {
    event.preventDefault()
    this.props.profileSelected(profile)
  }

  render () {
    const list = this.props.profiles.map((profile, i) => {
      let name = null
      if (this.props.selectedProfile === null) {
        name = <a href='#' onClick={(event) => this.selectProfile(profile, event)}><span>{ profile.firstName }</span></a>
      } else if (this.props.selectedProfile.id === profile.id) {
        name = <a href='#' onClick={(event) => this.selectProfile(profile, event)}><strong style={{color: 'red'}}>{profile.firstName}</strong></a>
      } else {
        name = <a href='#' onClick={(event) => this.selectProfile(profile, event)}><span>{ profile.firstName }</span></a>
      }
      return <li key={profile.id}>{ name }</li>
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
    profiles: state.profile.list,
    selectedProfile: state.profile.selectedProfile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    profilesReceived: (profiles) => dispatch(actions.profilesReceived(profiles)),
    profileSelected: (profile) => dispatch(actions.profileSelected(profile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
