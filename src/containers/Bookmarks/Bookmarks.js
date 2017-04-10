import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { APIManager } from '../../utils'
import actions from '../../actions'
import { BookmarkCard } from '../../presentation'

class Bookmarks extends Component {
  componentDidMount () {
    // listen for change on selectedProfile

    // get all bookmarks
    
  }

  componentDidUpdate () {
    const params = {profile: this.props.selectedProfile.id}
    const list = this.props.bookmarks[this.props.selectedProfile.id]
    if (list) return null
    APIManager.get('/api/bookmark', params, (err, response) => {
      if (err) {
        console.log(err)
      }
      this.props.getBookmarks(response.results, params)
    })
  }

  render () {
    const bookmarksList = (this.props.selectedProfile === null) ? null : this.props.bookmarks[this.props.selectedProfile.id]
    return (
      <div>
        <h1>Bookmarks</h1>
        { bookmarksList && bookmarksList.map((bookmark, i) => {
            return <BookmarkCard bookmark={bookmark} key={bookmark.id} />
        })}
      </div>
    )
  }
}

Bookmarks.propTypes = {
  bookmarks: PropTypes.object,
  selectedProfile: PropTypes.object,
  getBookmarks: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    bookmarks: state.bookmark,
    selectedProfile: state.profile.selectedProfile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBookmarks: (bookmarks, params) => dispatch(actions.getBookmarks(bookmarks, params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks)
