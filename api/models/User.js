
'use strict'

const mongoose         = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified  = require('mongoose-createdmodified').createdModifiedPlugin,
      bcrypt           = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type 	 : String,
        required : true,
        unique : true
    },
    email: {
        type 	 : String,
        required : false
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    user_level: {
        type 	 : Number,
        required : true,
        default: 1
    },
    virgin: {
        type: Boolean,
        default: true
    },
    group: [{
        type 	 : mongoose.Schema.Types.ObjectId,
        ref 	 : 'Group',
        required : false
    }],
    fb_url: {
        type 	 : String,
        required : false,
    }

});

UserSchema.plugin(mongooseApiQuery)
UserSchema.plugin(createdModified, { index: true })

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next()
  if (!user.password) return next()

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

// use method in login route
UserSchema.methods.verifyPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  })
}

const User = mongoose.model('User', UserSchema)

module.exports = User
