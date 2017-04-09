import React, { PropTypes } from 'react'

const BookmarkCard = ({bookmark}) => {
  return (
    <div key={bookmark.id}>
      <img src={bookmark.image} style={{width: '20%', height: '20%'}}/>
      <h2>{bookmark.title}</h2>
      <p>{bookmark.description}</p>
      <a href={bookmark.url} target='_blank'>{bookmark.url}</a>
      <p>{bookmark.timestamp}</p>
    </div>
  )
}

BookmarkCard.propTypes = {
  bookmark: PropTypes.object
}

export default BookmarkCard
