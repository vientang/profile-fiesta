import React from 'react'
import { Profiles, ManageUsers, Bookmarks } from '../../containers'

const Home = () => {
  return (
    <div className='row'>
      <div className='col-md-3'>        
        <Profiles />
      </div>
      <div className='col-md-6'>
        <Bookmarks />
      </div>
      <div className='col-md-3'>
        <ManageUsers />
      </div>
    </div>
  )
}

export default Home
