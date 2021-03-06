import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { Login, Logout, SignInForm, BookmarkInput } from '../../presentation'

class ManageUsers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visitor: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        link: ''
      }
    }
    this.updatedVisitor = this.updatedVisitor.bind(this)
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.updateLink = this.updateLink.bind(this)
    this.submitLink = this.submitLink.bind(this)
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

  register (event) {
    event.preventDefault()
    APIManager.post('/account/register', this.state.visitor, (err, response) => {
      if (err) {
        return new Error(err)
      }
      this.props.profileCreated(response.profile)
    })
  }

  login (event) {
    event.preventDefault()
    APIManager.post('/account/login', this.state.visitor, (err, response) => {
      if (err) {
        return new Error(err)
      }
      this.props.currentUserReceived(response.profile)
    })
  }

  logout (event) {
    event.preventDefault()
    APIManager.get('/account/logout', this.state.visitor, (err, response) => {
      if (err) {
        return new Error(err)
      }
      this.props.currentUserLoggedout(null)
    })
  }

  updateLink (event) {
    event.preventDefault()
    this.setState({
      visitor: {
        link: event.target.value
      }
    })
  }

  submitLink (event) {
    event.preventDefault()
    // console.log("Current User", this.props.currentUser)
    const bookmark = {
      profile: this.props.currentUser.id,
      url: this.state.visitor.link
    }
    APIManager.post('/api/bookmark', bookmark, (err, response) => {
      if (err) {
        return new Error(err)
      }
      this.setState({
        visitor: {
          link: ''
        }
      })
      this.props.saveBookmark(response.result)
    })
  }

  updatedVisitor (event) {
    let updated = Object.assign({}, this.state.visitor)
    updated[event.target.id] = event.target.value
    this.setState({
      visitor: updated
    })
  }
  
  render () {
    return (
      <div>
        {(this.props.currentUser !== null) ?
          <div>
            <h2>Welcome {this.props.currentUser.firstName}</h2>
            <Logout onClick={this.logout} /> 
            <BookmarkInput updateLink={this.updateLink} submitLink={this.submitLink} link={this.state.visitor.link}/>           
          </div> 
        : 
          <div>
            <SignInForm onChange={this.updatedVisitor} onClick={this.register} />
            <Login onClick={this.login} onChange={this.updatedVisitor} />
          </div>
        }
      </div>      
    )
  }
}

ManageUsers.propTypes = {
  currentUser: PropTypes.object,
  profileCreated: PropTypes.func,
  currentUserReceived: PropTypes.func,
  currentUserLoggedout: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.account.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
    currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile)),
    currentUserLoggedout: (profile) => dispatch(actions.currentUserLoggedout(profile)),
    saveBookmark: (bookmark) => dispatch(actions.saveBookmark(bookmark))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers)
