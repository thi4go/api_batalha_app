'use strict'

const mongoose       = require('mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const BattleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    brackets: {
        type 	 : mongoose.Schema.Types.ObjectId,
        ref: 'Bracket',
        required : true,
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    active: {
        type: Boolean,
        default: true
    }
});

BattleSchema.plugin(mongooseApiQuery)
BattleSchema.plugin(createdModified, { index: true })

const Battle = mongoose.model('Battle', BattleSchema)
module.exports = Battle
