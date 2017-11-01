
'use strict'

const mongoose         = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      autopopulate     = require('mongoose-autopopulate'),
      createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const BracketSchema = new mongoose.Schema({
    first_stage: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Round',
      autopopulate: true
    }],

    quarter_final: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Round',
      autopopulate: true

    }],

    semi_final: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Round',
      autopopulate: true
    }],

    finale: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Round',
      autopopulate: true
    }]
});

BracketSchema.plugin(autopopulate)
BracketSchema.plugin(mongooseApiQuery)
BracketSchema.plugin(createdModified, { index: true })

const Bracket = mongoose.model('Bracket', BracketSchema)
module.exports = Bracket
