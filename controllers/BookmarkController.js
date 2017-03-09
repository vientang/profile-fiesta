var Promise = require('bluebird')
var superagent = require('superagent')
var Bookmark = require('../models/BookmarkSchema')
var Scraper = require('../utils').Scraper

module.exports = {
	find: function(params) {
		return new Promise(function(resolve, reject) {
			Bookmark.find(params, function(err, bookmarks) {
				if (err) {
					reject(err)
					return
				}
				var summaries = bookmarks.map(function(bookmark) {
					return bookmark.summary()
				})
				resolve(summaries)
			})
		})
	},
	findById: function(id) {
		return new Promise(function(resolve, reject) {
			Bookmark.findById(id, function(err, bookmark) {
				if (err) {
					reject(err)
					return
				}
				resolve(bookmark.summary())
			})
		})
	},
	create: function(params) {
		return new Promise(function(resolve, reject) {
			superagent
			.get(params.url)
			.query(null)
			.set('Accept', 'text/html')
			.end(function(err, response) {
				if (err) {
					res.json({
				  	confirmation: 'Failed',
				  	resource: err
				  })
				  return
				}
				var html = response.text
				var props = ['og:title', 'og:description', 'og:image']
				var metaData = Scraper.scrape(html, props, params.url);

				Bookmark.create(metaData, function(err, bookmark) {
					if (err) {
						reject(err)
						return
					}
				resolve(bookmark.summary())
				})
			})

		})
	}
}