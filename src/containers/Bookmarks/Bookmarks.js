import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { BookmarkCard } from '../../presentation'

class Bookmarks extends Component {
  componentDidMount () {
    // get all bookmarks
    APIManager.get('/api/bookmark', null, (err, response) => {
      if (err) {
        console.log(err)
      }
      this.props.getBookmarks(response.results)
    })
  }

  render () {
    return (
      <div>
        <h1>Bookmarks</h1>
        { this.props.bookmarks.map((bookmark, i) => {
            return <BookmarkCard bookmark={bookmark} key={bookmark.id} />
        })}
      </div>
    )
  }
}

Bookmarks.propTypes = {
  bookmarks: PropTypes.array,
  selectedProfile: PropTypes.object,
  getBookmarks: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    bookmarks: state.bookmark.all,
    selectedProfile: state.profile.selectedProfile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBookmarks: (bookmarks) => dispatch(actions.getBookmarks(bookmarks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks)
