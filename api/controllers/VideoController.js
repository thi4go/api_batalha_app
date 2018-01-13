'use strict';

const Controller      = require('./Controller'),
    mongoose        = require('mongoose'),
    Video           = mongoose.model('Video')

const VideoController = {

  // ------- RESTful ROUTES -------

  getAll (req, res, next) {
    Controller.getAll(Group, res)
  },

  getById (req, res, next) {
    const id = req.params.id

    Controller.getById(Group, res, id)
  },

  update (req, res, next) {
    const id   = req.params.id
    const data = req.body

    Controller.update(Group, res, id, data)
  },

  delete (req, res, next) {
    const id = req.params.id

    Controller.delete(Group, res, id)
  },
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

    }
}

module.exports = VideoController

