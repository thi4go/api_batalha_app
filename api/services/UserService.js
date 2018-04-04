const mongoose = require('mongoose'),
      User     = mongoose.model('User'),
      service  = require('./Service')

// let checkoutService = require('./CheckoutService')

const UserService = {

  getUserById (id){
    return service.getById(User, id)
  },

  updateUserById (id, data){
    return service.updateById(User, id, data)
  },

  async setUsersVirgin (users) {
    for (let user of users) {
      await User.findOneAndUpdate({ _id: user._id }, { virgin: false })
    }
  }
}

module.exports = UserService
