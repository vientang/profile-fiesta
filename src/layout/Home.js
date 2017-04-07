import React, { Component } from 'react'
import { Profiles, Signup } from '../containers'

class Home extends Component {
  render () {
    return (
      <div className='row'>
        <div className='col-md-3'>
          <h1>Profiles</h1>
          <Profiles />
        </div>
        <div className='col-md-6'>
          <h1>Links</h1>
        </div>
        <div className='col-md-3'>          
          <Signup />
        </div>

      </div>
    )
  }
}

export default Home
