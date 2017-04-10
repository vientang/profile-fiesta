import React, { PropTypes } from 'react'

const Logout = ({onClick}) => {
  return (
    <div>
      <a href='#'><p onClick={onClick} className='logoutText'>Log Out</p></a>
    </div>
  )
}

Logout.propTypes = {
  onClick: PropTypes.func,
}

export default Logout
