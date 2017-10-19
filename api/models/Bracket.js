
'use strict'

const mongoose         = require('mongoose'),
      mongooseApiQuery = require('mongoose-api-query'),
      createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const BracketSchema = new mongoose.Schema({
    first_stage: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Round'
    }],

    quarter_final: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Round'
    }],

    semi_final: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Round'
    }],

    finale: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Round'
    }]
});

BracketSchema.plugin(mongooseApiQuery)
BracketSchema.plugin(createdModified, { index: true })

const Bracket = mongoose.model('Bracket', BracketSchema)
module.exports = Bracket
