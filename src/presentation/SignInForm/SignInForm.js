import React, { PropTypes } from 'react'

const SignInForm = ({onClick, onChange}) => {
  return (
    <div>
      <h2>Sign In</h2>
      <input onChange={onChange} type='text' id='firstName' placeholder='First Name' /><br />
      <input onChange={onChange} type='text' id='lastName' placeholder='Last Name' /><br />
      <input onChange={onChange} type='email' id='email' placeholder='Email' /><br />
      <input onChange={onChange} type='password' id='password' placeholder='Password' /><br />
      <button onClick={onClick}>Join</button>
    </div>
  )
}

SignInForm.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func
}

export default SignInForm
