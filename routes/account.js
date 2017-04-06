const express = require('express')
const bcrypt = require('bcrypt')
const controllers = require('../controllers')
const router = express.Router()
const utils = require('../utils')

router.get('/:action', (req, res, next) => {
  const action = req.params.action
  if (action === 'logout') { // log out user
    req.session.reset()
    res.json({
      confirmation: 'Success',
      message: 'Successfully logged out'
    })
  }

  if (action === 'currentuser') { // check for current user
    if (!req.session || !req.session.token) {
      res.json({
        confirmation: 'Failed',
        message: 'User not found'
      })
      return
    }
    const token = req.session.token
    utils.JWT.verify(token, process.env.TOKEN_SECRET)
      .then(function (decode) {
        return controllers.profile.findById(decode.id)
      })
      .then(function (profile) {
        res.json({
          confirmation: 'Success',
          profile: profile
        })
      })
      .catch(function (err) {
        res.json({
          confirmation: 'Failed',
          message: `Invalid token ${err}`
        })
      })
  }
})

/* POST to register. */
router.post('/register', (req, res, next) => {
  const credentials = req.body
  controllers.profile
    .create(credentials)
    .then((profile) => {
      // create a signed token
      const token = utils.JWT.sign({id: profile.id}, process.env.TOKEN_SECRET)
      req.session.token = token
      res.json({
        confirmation: 'Success',
        profile: profile,
        token: token
      })
    })
    .catch((err) => {
      res.json({
        confirmation: 'Failed',
        message: `Invalid credentials ${err}`
      })
    })
})

/* POST to login. */
router.post('/login', (req, res, next) => {
  // check email and password
  const credentials = req.body
  controllers.profile
    .find({email: credentials.email}, true)
    .then(function (profiles) {
      if (profiles.length === 0) {
        res.json({
          confirmation: 'Failed',
          message: 'Profile not found'
        })
        return
      }
      const profile = profiles[0]
      const passwordCorrect = bcrypt.compareSync(credentials.password, profile.password)
      if (!passwordCorrect) {
        res.json({
          confirmation: 'Failed',
          message: "Password doesn't match"
        })
        return
      }

      // create a signed token
      const token = utils.JWT.sign({id: profile._id}, process.env.TOKEN_SECRET)
      req.session.token = token
      res.json({
        confirmation: 'Success',
        message: profile.summary(),
        token: token
      })
    })
    .catch(function (err) {
      res.json({
        confirmation: 'Failed',
        message: err
      })
    })
})

module.exports = router
