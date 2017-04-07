import React from 'react'
import { Profiles, ManageUsers } from '../../containers'

const Home = () => {
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
        <ManageUsers />
      </div>
    </div>
  )
}

export default Home
