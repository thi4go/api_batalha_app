
'use strict'

const mongoose       = require('mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    autopopulate     = require('mongoose-autopopulate'),
    createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const RoundSchema = new mongoose.Schema({
    first: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true,
        autopopulate: true
    },
    second: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default : null,
        autopopulate: true
    },
    third: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
        autopopulate: true
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
        autopopulate: true
    },
    stage: {
        type: Number
    },
    video: {
        type: String,
        default: null,
        autopopulate: true
    }
});

RoundSchema.plugin(autopopulate)
RoundSchema.plugin(mongooseApiQuery)
RoundSchema.plugin(createdModified, { index: true })

const Round = mongoose.model('Round', RoundSchema)

module.exports = Round
