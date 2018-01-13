'use strict';

const Controller  = require('./Controller'),
    mongoose      = require('mongoose'),
    User          = mongoose.model('User')

const AuthController = {

  register () {

  },

  login (req, res, next) {
    const data = req.body

    User.findOne({email: data.email}).then( user => {
      user.verifyPassword(data.password, (err, result) => {
        if (err) res.send(err)
        if (result) res.send('ae')
        else res.send('ah')
      })
    })

  }
}

module.exports = AuthController
