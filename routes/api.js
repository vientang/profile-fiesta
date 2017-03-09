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
	controller.find(req.query, false)
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

router.get('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource
	var controller = controllers[resource]
	if (!controller) {
		res.json({
	  	confirmation: 'Failed',
	  	resource: 'Invalid API request'
	  })
	}
	var id = req.params.id
	controller.findById(id)
		.then(function(result) {
		  res.json({
		  	confirmation: 'Success',
		  	result: result
		  })
		})
		.catch(function(err) {
			res.json({
		  	confirmation: 'Failed',
		  	resource: resource+' of '+id+' not found'
		  })
		})
})

router.post('/:resource', function(req, res, next) {
	var resource = req.params.resource
	var controller = controllers[resource]
	if (!controller) {
		res.json({
	  	confirmation: 'Failed',
	  	resource: 'Invalid API request'
	  })
	}
	controller.create(req.body)
		.then(function(result) {
			res.json({
				confirmation: 'Success',
	  		result: result
			})
		})
		.catch(function(err) {
			res.json({
		  	confirmation: 'Failed',
		  	resource: resource + ' not not created'
		  })
		})
})
module.exports = router;
