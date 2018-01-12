'use strict';

const Controller      = require('./Controller'),
    mongoose        = require('mongoose'),
    News            = mongoose.model('News')

const NewsController = {

  // ------- RESTful ROUTES -------

  getAll (req, res, next) {
    Controller.getAll(News, res)
  },

  getById (req, res, next) {
    const id = req.params.id

    Controller.getById(News, res, id)
  },

  update (req, res, next) {
    const id   = req.params.id
    const data = req.body

    Controller.update(News, res, id, data)
  },

  delete (req, res, next) {
    const id = req.params.id

    Controller.delete(News, res, id)
  },
    /* @TODO */
    createNews(req, res, next){
    }
}

module.exports = NewsController

