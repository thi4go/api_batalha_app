
'use strict'

const mongoose       = require('mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    autopopulate     = require('mongoose-autopopulate'),
    createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const GroupSchema = new mongoose.Schema({

    name: {
        type 	 : String,
        required : true
    },
    members: [{
        type : mongoose.Schema.Types.ObjectId,
        ref	 : 'User',
        required : false,
        autopopulate: true
    }],

});

GroupSchema.plugin(autopopulate)
GroupSchema.plugin(mongooseApiQuery)
GroupSchema.plugin(createdModified, { index: true })

const Group = mongoose.model('Group', GroupSchema)
module.exports = Group
