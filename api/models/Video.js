'use strict'

const mongoose       = require('mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    _                = require('mongoose-type-url'),
    createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const VideoSchema = new mongoose.Schema({
    title: {
        type: String
    },

    description: {
        type: String
    },

    url: {
        type: mongoose.Schema.Types.Url,
        required: true
    }
});

VideoSchema.plugin(mongooseApiQuery)
VideoSchema.plugin(createdModified, { index: true })

const Video = mongoose.model('Video', VideoSchema)
module.exports = Video
