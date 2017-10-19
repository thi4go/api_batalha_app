const mongoose = require('mongoose'),
      User     = mongoose.model('User'),
      service  = require('./Service')

let checkoutService = require('./CheckoutService')

const UserService = {
  getUserById(id){
    return service.getById(User, id)
  },
  updateUserById(id, data){
    return service.updateById(User, id, data)
  },


}

module.exports = UserService
