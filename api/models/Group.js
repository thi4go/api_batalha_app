
'use strict'

const mongoose         = require('mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const GroupSchema = new mongoose.Schema({

    name: {
        type 	 : String,
        required : true
    },
    _members: [{
        type : mongoose.Schema.Types.ObjectId,
        ref	 : 'User',
        required : false
    }],

});

GroupSchema.plugin(mongooseApiQuery)
GroupSchema.plugin(createdModified, { index: true })

const Group = mongoose.model('Group', GroupSchema)
module.exports = Group
