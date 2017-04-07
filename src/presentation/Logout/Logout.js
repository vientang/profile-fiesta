import React, { PropTypes } from 'react'

const Logout = ({onClick}) => {
  return (
    <div>
      <p onClick={onClick}>Log Out</p>
    </div>
  )
}

Logout.propTypes = {
  onClick: PropTypes.func,
}

export default Logout
