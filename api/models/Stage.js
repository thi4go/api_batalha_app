'use strict'

const mongoose     = require('mongoose'),
  mongooseApiQuery = require('mongoose-api-query'),
  autopopulate     = require('mongoose-autopopulate'),
  createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const StageSchema = new mongoose.Schema({
  label: {
    type: Number,
  },

  rounds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Round',
    autopopulate: true
  }]

});

StageSchema.plugin(autopopulate)
StageSchema.plugin(mongooseApiQuery)
StageSchema.plugin(createdModified, { index: true })

const Stage = mongoose.model('Stage', StageSchema)
module.exports = Stage

