import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { APIManager } from '../../utils'
import actions from '../../actions'

class Profiles extends Component {
  componentDidMount () {
    APIManager.get('/api/profile', null, (err, response) => {
      if (err) {
        console.log(err)
      }
      const results = response.results
      this.props.profilesReceived(results)
    })
  }

  render () {
    const list = this.props.profiles.map((profile, i) => {
      return <li key={profile.id}> { profile.firstName } </li>
    })
    return (
      <div>
        <ol> { list } </ol>
      </div>
    )
  }
}

Profiles.propTypes = {
  profiles: PropTypes.array,
  profilesReceived: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profile.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    profilesReceived: (profiles) => dispatch(actions.profilesReceived(profiles))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
