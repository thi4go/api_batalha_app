'use strict';


const _ 	   = require('lodash'),
  mongoose = require('mongoose')


const Service = {

  getById(type,id){
      return type.findOne({ _id: id });
  },

  getByIdPopulating(type,id,populate,childrens){
      return type.findOne({_id: id})
        .populate({
          path: populate,
          populate: { path: childrens }
        })
        .exec();
  },

  create : function(type) {
      return type.save();
  },

  getAll : function(type) {
     return type.apiQuery({});
  },

  getAllPopulating(type,populate,childrens){
      return type.apiQuery({})
        .populate({
          path: populate,
          populate: { path: childrens || ''  }
        })
        .exec();
  },

  updateById(type, id, data){
      return type.findOneAndUpdate({ _id: id }, data);
  },

  deleteById : function(type, id) {
      return type.remove({_id: id});
  },

}

module.exports = Service
