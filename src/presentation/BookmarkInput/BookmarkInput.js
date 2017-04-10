import React, { PropTypes } from 'react'

const BookmarkInput = ({link, updateLink, submitLink}) => {
  return (
    <div>
      <input 
        onChange={updateLink} 
        type='text'
        value={link}
        placeholder='www.example.com' />
      <button onClick={submitLink} type='submit'>Submit Link</button>
    </div>
  )
}

BookmarkInput.propTypes = {
  link: PropTypes.string,
  submitLink: PropTypes.func,
  updateLink: PropTypes.func
}

export default BookmarkInput
