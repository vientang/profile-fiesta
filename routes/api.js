var express = require('express')
var controllers = require('../controllers')
var router = express.Router()

/* GET users listing. */
router.get('/:resource', function(req, res, next) {
	var resource = req.params.resource
	var controller = controllers[resource]
	if (!controller) {
		res.json({
	  	confirmation: 'Failed',
	  	resource: 'Invalid API request'
	  })
	}
	controller.find(req.query)
		.then(function(entities) {
		  res.json({
		  	confirmation: 'Success',
		  	results: entities
		  })
		})
		.catch(function(err) {
			res.json({
		  	confirmation: 'Failed',
		  	resource: err
		  })
		})
})

module.exports = router;
