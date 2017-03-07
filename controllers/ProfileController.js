var Promise = require('bluebird')
var Profile = require('../models/ProfileSchema')

module.exports = {
	find: function(params) {
		return new Promise(function(resolve, reject) {
			Profile.find(params, function(err, profiles) {
				if (err) {
					reject(err)
					return
				}
				resolve(profiles)
			})
		})
	}
}