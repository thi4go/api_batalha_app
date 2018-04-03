'use strict'

const mongoose       = require('mongoose'),
  mongooseApiQuery = require('mongoose-api-query'),
  autopopulate     = require('mongoose-autopopulate'),
  createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const BattleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  stages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stage',
    required: true,
    autopopulate: true
  }],
  phases: {
    type: Number,
    required: true
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    autopopulate: true
  },
  active: {
    type: Boolean,
    default: true
  }
});

BattleSchema.plugin(autopopulate)
BattleSchema.plugin(mongooseApiQuery)
BattleSchema.plugin(createdModified, { index: true })

const Battle = mongoose.model('Battle', BattleSchema)
module.exports = Battle
