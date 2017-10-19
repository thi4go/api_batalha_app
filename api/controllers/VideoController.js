'use strict';

const _             = require('lodash'),
    controller      = require('./Controller'),
    mongoose        = require('mongoose'),
    Video           = mongoose.model('Video')

const VideoController = {

    createVideo(req, res, next){
        let data = req.body;
        let video = new Video({
            'title'       : data.title,
            'description' : data.description,
            'url'         : data.url
        });

        video.save(function(err, doc){
            if(err) controller.returnResponseError(res,err);

            controller.returnResponseSuccess(res,doc,'Created with Success');
        });

    },

    deleteVideo(req, res, next){
        let id = req.params.video_id;
        controller.deleteById(Video, id, req, res, next);
    },

    updateVideo(req, res, next){
        let data = req.body || {};
        let id   = req.params.video_id;

        controller.updateById(Video, id, data, req, res, next);
    },

    getVideoById(req, res, next){
        let id = req.params.video_id;
        controller.getById(Video, id, req, res, next);
    },

    getAllVideos(req, res, next){
        Video.find({}).exec(function(err, videos){
            if(err) controller.returnResponseError(res,err);

            if(!videos) controller.returnResponseNotFound(res,next);

            controller.returnResponseSuccess(res,videos);
        });
    }

}

module.exports = VideoController

