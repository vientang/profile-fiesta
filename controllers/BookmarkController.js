var Promise = require('bluebird')
var Bookmark = require('../models/BookmarkSchema')

module.exports = {
	find: function(params) {
		return new Promise(function(resolve, reject) {
			Bookmark.find(params, function(err, bookmarks) {
				if (err) {
					reject(err)
					return
				}
				resolve(bookmarks)
			})
		})
	}
}