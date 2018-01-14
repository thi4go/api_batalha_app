'use strict';

const Controller  = require('./Controller'),
    mongoose      = require('mongoose'),
    jwt           = require('jsonwebtoken'),
    User          = mongoose.model('User')

const AuthController = {

  login (req, res, next) {
    const data = req.body

    User.findOne({email: data.email}).then( user => {
      user.verifyPassword(data.password, (err, result) => {
        if (err) res.send(err)
        if (result) {
          res.json({
            user: user,
            token: jwt.sign({ _id: user._id, email: user.email, user_level: user.user_level }, 'battleofbattles')
          })
        }
        else res.send('ah')
      })
    }).catch( err => {
      Controller.returnResponseError(res, err, 'User does not exist')
    })
  },

  verify (req, res, next) {
    const token = req.body.token

    jwt.verify(token, 'battleofbattles', (err, decoded) => {
      if (err) Controller.returnResponseError(res, err, 'invalid token')
      else res.send(decoded)
    })
  }

}

module.exports = AuthController
