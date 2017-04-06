const express = require('express')
const controllers = require('../controllers')
const router = express.Router()

/* GET users listing. */
router.get('/:resource', (req, res, next) => {
  const resource = req.params.resource
  const controller = controllers[resource]
  if (!controller) {
    res.json({
      confirmation: 'Failed',
      resource: 'Invalid API request'
    })
  }
  controller.find(req.query, false)
    .then(function (entities) {
      res.json({
        confirmation: 'Success',
        results: entities
      })
    })
    .catch(function (err) {
      res.json({
        confirmation: 'Failed',
        resource: err
      })
    })
})

router.get('/:resource/:id', (req, res, next) => {
  const resource = req.params.resource
  const controller = controllers[resource]
  if (!controller) {
    res.json({
      confirmation: 'Failed',
      resource: 'Invalid API request'
    })
  }
  const id = req.params.id
  controller.findById(id)
    .then(function (result) {
      res.json({
        confirmation: 'Success',
        result: result
      })
    })
    .catch(function (err) {
      res.json({
        confirmation: 'Failed',
        resource: `${err}: resource of ${id} not found`
      })
    })
})

router.post('/:resource', (req, res, next) => {
  const resource = req.params.resource
  const controller = controllers[resource]
  if (!controller) {
    res.json({
      confirmation: 'Failed',
      resource: 'Invalid API request'
    })
  }
  controller.create(req.body)
    .then(function (result) {
      res.json({
        confirmation: 'Success',
        result: result
      })
    })
    .catch(function (err) {
      res.json({
        confirmation: 'Failed',
        resource: `${err}: resource of ${resource} not created`
      })
    })
})

module.exports = router
