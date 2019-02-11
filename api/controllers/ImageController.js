'use strict';

const Controller      = require('./Controller'),
    mongoose        = require('mongoose'),
    Image           = mongoose.model('Image')

const ImageController = {

  // ------- RESTful ROUTES -------

  getAll (req, res, next) {
    Controller.getAll(Image, res)
  },

  getById (req, res, next) {
    const id = req.params.id

    Controller.getById(Image, res, id)
  },

  update (req, res, next) {
    const id   = req.params.id
    const data = req.body

    Controller.update(Image, res, id, data)
  },

  delete (req, res, next) {
    const id = req.params.id

    Controller.delete(Image, res, id)
  },

  createImage(req, res, next){
      let data = req;
      console.log(data.body)
      let image = new Image({
          'title'    : data.title,
          'subtitle' : data.subtitle,
          'url'      : data.url
      });
      //
      // image.save(function(err, doc){
      //     if(err) Controller.returnResponseError(res,err);
      //
      //     Controller.returnResponseSuccess(res,doc,'Created with Success');
      // });

  }
}

module.exports = ImageController
