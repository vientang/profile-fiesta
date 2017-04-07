import React, { PropTypes } from 'react'

const BookmarkInput = ({onChange, onClick}) => {
  return (
    <div>
      <input onChange={onChange} type='text' placeholder='www.example.com' />
      <button onClick={onClick} type='submit'>Submit Link</button>
    </div>
  )
}

BookmarkInput.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func
}

export default BookmarkInput
