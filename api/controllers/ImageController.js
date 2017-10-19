'use strict';

const _             = require('lodash'),
    controller      = require('./Controller'),
    mongoose        = require('mongoose'),
    Image           = mongoose.model('Image')

const ImageController = {

    createImage(req, res, next){
        let data = req.body;
        let image = new Image({
            'title'    : data.title,
            'subtitle' : data.subtitle,
            'url'      : data.url
        });

        image.save(function(err, doc){
            if(err) controller.returnResponseError(res,err);

            controller.returnResponseSuccess(res,doc,'Created with Success');
        });

    },

    deleteImage(req, res, next){
        let id = req.params.image_id;
        controller.deleteById(Image, id, req, res, next);
    },

    updateImage(req, res, next){
        let data = req.body || {};
        let id   = req.params.image_id;

        controller.updateById(Image, id, data, req, res, next);
    },

    getImageById(req, res, next){
        let id = req.params.image_id;
        controller.getById(Image, id, req, res, next);
    },

    getAllImages(req, res, next){
        Image.find({}).exec(function(err, images){
            if(err) controller.returnResponseError(res,err);

            if(!images) controller.returnResponseNotFound(res,next);

            controller.returnResponseSuccess(res,images);
        });
    }

}

module.exports = ImageController

