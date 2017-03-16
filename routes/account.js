var express = require('express')
var bcrypt = require('bcrypt')
var controllers = require('../controllers')
var router = express.Router()
var utils = require('../utils')

router.get('/:action', function(req, res, next) {
	var action = req.params.action
	if (action === 'logout') { // log out user
		req.session.reset()
		res.json({
			confirmation: "Success",
			message: "Successfully logged out"
		})		
	}

	if (action === 'currentuser') { // check for current user
		if (!req.session || !req.session.token) {
			res.json({
				confirmation: "Failed",
				message: "User not found"
			})
			return 
		}
		var token = req.session.token
		utils.JWT.verify(token, process.env.TOKEN_SECRET)
			.then(function(decode) {
				return controllers.profile.findById(decode.id)				
			})
			.then(function(profile) {
				res.json({
					confirmation: "Success",
					profile: profile
				})
			})
			.catch(function(err) {
				res.json({
					confirmation: "Failed",
					message: "Invalid token " + err
				})
				return
			})
	}
})

/* POST to login. */
router.post('/login', function(req, res, next) {
	// check email and password
	var credentials = req.body
	controllers.profile
		.find({email: credentials.email}, true)
		.then(function(profiles) {
			if (profiles.length === 0) {
				res.json({
					confirmation: "Failed",
					message: "Profile not found"
				})
				return
			}
			var profile = profiles[0]
			var passwordCorrect = bcrypt.compareSync(credentials.password, profile.password)
			if (!passwordCorrect) {
				res.json({
					confirmation: "Failed",
					message: "Password doesn't match"
				})
				return
			}

			// create a signed token
			var token = utils.JWT.sign({id: profile._id}, process.env.TOKEN_SECRET)
			req.session.token = token
			res.json({
				confirmation: "Success",
				message: profile.summary(),
				token: token
			})
		})
		.catch(function(err) {
			res.json({
				confirmation: "Failed",
				message: err
			})
		})
})
module.exports = router;
