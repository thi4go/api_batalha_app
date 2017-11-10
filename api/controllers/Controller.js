'use strict';


const _ 	   = require('lodash'),
	  mongoose = require('mongoose')


const Controller = {

	returnResponseSuccess(res,data,msg){
		return res.json({
			success : true,
			data    : data,
			msg     : msg
		})

	},

	returnResponseError(res,err){
		return res.json({
			success : false,
			error   : err,
			msg     : err.message
		})
	},

	returnResponseNotFound(res,next){
		return res.json({
			success : false,
			msg     : new errors.ResourceNotFoundError('The resource you requested could not be found.')
		})
	},

	create (type, res) {
		const scope = this

		type.save(function(err,doc) {
			if (err) scope.returnResponseError(res, err)
  		else scope.returnResponseSuccess(res, doc, 'Updated with Success')
		})
	},

	update (type, res, id, data) {
		const scope = this

		type.findOneAndUpdate({_id: id}, data, function(err, doc) {
			if (err) scope.returnResponseError(res, err)
			else scope.returnResponseSuccess(res, doc, 'Updated with success')
		})
	},

	delete (type, res, id) {
		const scope = this

		type.remove({ _id: id }, function(err) {
			if (err) scope.returnResponseError(res,err)
			else scope.returnResponseSuccess(res,[],'deleted with success')
		})
	},

	getAll (type, res, populate, childrens) {
		const scope = this

		type.apiQuery({})
			.exec(function(err, docs) {
				if (err) scope.returnResponseError(res, err)
				else scope.returnResponseSuccess(res, docs)
			});
	},

	getById (type, res, id) {
		const scope = this

		type.findOne({ _id: id }, function(err, doc) {
			if (err) 	scope.returnResponseError(res,err)
			else 	scope.returnResponseSuccess(res,doc)
		})
	},

	updateById : function(type, id, data, req, res, next) {

		const scope = this

		type.findOneAndUpdate({ _id: id }, data, function(err, doc) {
			if (err)
				scope.returnResponseError(res,err)
			else if (!doc)
				scope.returnResponseNotFound(err,next)

			scope.returnResponseSuccess(res,data)

		})

	},

	deleteById : function(type, id, req, res, next) {

		const scope = this
		type.remove({ _id: id }, function(err) {

			if (err)
				scope.returnResponseError(res,err)

			scope.returnResponseSuccess(res,[],'deleted with success')


		})

	},

}

module.exports = Controller
