'use strict';

const _             = require('lodash'),
    controller      = require('./Controller'),
    mongoose        = require('mongoose'),
    News            = mongoose.model('News')

const NewsController = {

    /* @TODO */
    createNews(req, res, next){
    },

    deleteNews(req, res, next){
        let id = req.params.news_id;
        controller.deleteById(News, id, req, res, next);
    },

    updateNews(req, res, next){
        let data = req.body || {};
        let id   = req.params.news_id;

        controller.updateById(News, id, data, req, res, next);
    },

    getNewsById(req, res, next){
        let id = req.params.news_id;
        controller.getById(News, id, req, res, next);
    },

    getAllNews(req, res, next){
        News.find({}).exec(function(err, news){
            if(err) controller.returnResponseError(res,err);

            if(!news) controller.returnResponseNotFound(res,next);

            controller.returnResponseSuccess(res,news);
        });
    }

}

module.exports = NewsController

