var express = require('express')
var bcrypt = require('bcrypt')
var controllers = require('../controllers')
var router = express.Router()

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

			res.json({
				confirmation: "Success",
				message: profile.summary()
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
