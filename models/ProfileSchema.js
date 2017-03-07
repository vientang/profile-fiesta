var mongoose = require('mongoose')

var ProfileSchema = new mongoose.Schema({
	firstName: {type: String, trim: true, default: ''},
	lastName: {type: String, trim: true, default: ''},
	email: {type: String, trim: true, lowercase: true, default: ''},
	password: {type: String, default: ''},
	timestamp: {type: Date, default: Date.now()},
})

module.exports = mongoose.model('ProfileSchema', ProfileSchema);