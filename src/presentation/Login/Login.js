import React, { PropTypes } from 'react'

const Login = ({onChange, onClick}) => {
  return (
    <div>
      <h2>Log In</h2>
      <input onChange={onChange} type='email' id='email' placeholder='Email' /><br />
      <input onChange={onChange} type='password' id='password' placeholder='Password' /><br />
      <button onClick={onClick}>Log In</button>
    </div>
  )
}

Login.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func
}

export default Login
