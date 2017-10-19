
'use strict'

const mongoose         = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const UserSchema = new mongoose.Schema({
    name: {
        type 	 : String,
        required : true,
    },
    email: {
        type 	 : String,
        unique   : true
    },
    gender: {
        type: String,
        required: true
    },
    user_level: {
        type 	 : Number,
        required : true,
    },
    virgin: {
        type: Boolean,
        default: false
    },
    _group: [{
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

const User = mongoose.model('User', UserSchema)
module.exports = User
