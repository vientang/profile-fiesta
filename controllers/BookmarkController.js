const Promise = require('bluebird')
const superagent = require('superagent')
const Bookmark = require('../models/BookmarkSchema')
const Scraper = require('../utils').Scraper

module.exports = {
  find: (params, isRaw) => {
    return new Promise((resolve, reject) => {
      Bookmark.find(params, (err, bookmarks) => {
        if (err) {
          reject(err)
          return
        }
        if (isRaw) {
          resolve(bookmarks)
          return
        }
        const summaries = bookmarks.map(bookmark => {
          return bookmark.summary()
        })
        resolve(summaries)
      })
    })
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      Bookmark.findById(id, (err, bookmark) => {
        if (err) {
          reject(err)
          return
        }
        resolve(bookmark.summary())
      })
    })
  },
  create: (params) => {
    return new Promise((resolve, reject) => {
      superagent
      .get(params.url)
      .query(null)
      .set('Accept', 'text/html')
      .end((err, response) => {
        if (err) {
          reject(err)
          return
        }
        let html = response.text
        let props = ['og:title', 'og:description', 'og:image']
        const metaData = Scraper.scrape(html, props, params.url)

        Bookmark.create(metaData, (err, bookmark) => {
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
