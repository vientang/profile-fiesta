import React, { Component, PropTypes } from 'react'
import { APIManager } from '../utils'

class Signup extends Component {

    constructor(props) {
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

    updatedVisitor(event) {
    	let updated = Object.assign({}, this.state.visitor)
    	updated[event.target.id] = event.target.value
    	this.setState({
    		visitor: updated 		
    	})
    }

    register(event) {
    	event.preventDefault();
    	APIManager.post('/api/profile', this.state.visitor, (err,response) => {
    		if (err) {
					console.log(err)
				}
				console.log('Register: ', JSON.stringify(response))
	    })
    }

    render() {
      return (
          <div>
          	<form>
          		<input onChange={this.updatedVisitor} type="text" id="firstName" placeholder="First Name" /><br/>
          		<input onChange={this.updatedVisitor} type="text" id="lastName" placeholder="Last Name" /><br/>
          		<input onChange={this.updatedVisitor} type="text" id="email" placeholder="Email" /><br/>
          		<input onChange={this.updatedVisitor} type="text" id="password" placeholder="Password" /><br/>
          		<button onClick={this.register}>Join</button>
          	</form>
          </div>
      )
    }
}

export default Signup;
