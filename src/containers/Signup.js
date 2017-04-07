import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { APIManager } from '../utils'
import actions from '../actions'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visitor: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
    this.updatedVisitor = this.updatedVisitor.bind(this)
    this.register = this.register.bind(this)
  }

  componentDidMount () {
    // check the current user
    APIManager.get('/account/currentuser', null, (err, response) => {
      if (err) {
        return new Error(err)
      }
      return response.profile ? this.props.currentUserReceived(response.profile) : null
    })
  }

  updatedVisitor (event) {
  	let updated = Object.assign({}, this.state.visitor)
    updated[event.target.id] = event.target.value
    this.setState({
      visitor: updated
    })
  }

  register (event) {
    event.preventDefault()
    APIManager.post('/account/register', this.state.visitor, (err, response) => {
      if (err) {
        return new Error(err)
      }
      this.props.profileCreated(response.profile)
    })
  }

  render () {
    return (
      <div>
        {(this.props.currentUser !== null) ? <h2>Welcome {this.props.currentUser.firstName}</h2> : 
          <form>
            <input onChange={this.updatedVisitor} type='text' id='firstName' placeholder='First Name' /><br />
            <input onChange={this.updatedVisitor} type='text' id='lastName' placeholder='Last Name' /><br />
            <input onChange={this.updatedVisitor} type='text' id='email' placeholder='Email' /><br />
            <input onChange={this.updatedVisitor} type='text' id='password' placeholder='Password' /><br />
            <button onClick={this.register}>Join</button>
          </form>
        }
      </div>      
    )
  }
}

Signup.propTypes = {
  profileCreated: PropTypes.func,
  currentUser: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.account.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
    currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
