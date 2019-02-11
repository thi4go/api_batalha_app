'use strict'

const mongoose       = require('mongoose'),
    mongooseApiQuery = require('mongoose-api-query'),
    _                = require('mongoose-type-url'),
    createdModified  = require('mongoose-createdmodified').createdModifiedPlugin

const ImageSchema = new mongoose.Schema({

    title: {
        type: String
    },

    subtitle:{
        type: String
    },

    data: {
        type: Buffer,
        contentType: String,
        required: true
    }

});

ImageSchema.plugin(mongooseApiQuery)
ImageSchema.plugin(createdModified, { index: true })

const Image = mongoose.model('Image', ImageSchema)
module.exports = Image
