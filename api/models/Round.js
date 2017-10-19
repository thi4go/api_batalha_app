
'use strict'

const mongoose         = require('mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const RoundSchema = new mongoose.Schema({
    first: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    second: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default : null
    },
    third: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    stage: {
        type: Number
    }
});

RoundSchema.plugin(mongooseApiQuery)
RoundSchema.plugin(createdModified, { index: true })

const Round = mongoose.model('Round', RoundSchema)
module.exports = Round
