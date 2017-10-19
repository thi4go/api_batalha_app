'use strict'

const mongoose       = require('mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    _                = require('mongoose-type-url'),
    createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const NewsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    subtitle: {
        type: String
    },

    body: {
        type: String,
        required: true
    },

    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],

    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }]

});

NewsSchema.plugin(mongooseApiQuery)
NewsSchema.plugin(createdModified, { index: true })

const News = mongoose.model('News', NewsSchema)
module.exports = News

