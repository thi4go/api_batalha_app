
'use strict';


const Controller = require('./Controller'),
		  mongoose   = require('mongoose'),
			User 	     = mongoose.model('User')


const UserController = {

	// ------- RESTful ROUTES -------

	getAll (req, res, next) {
		Controller.getAll(User, res)
	},

	getById (req, res, next) {
		const id = req.params.id

		Controller.getById(User, res, id)
	},

	update (req, res, next) {
		const id   = req.params.id
		const data = req.body

		Controller.update(User, res, id, data)
	},

	delete (req, res, next) {
		const id = req.params.id

		Controller.delete(User, res, id)
	},

	createUser : function(req, res, next) {
		let data = req.body || {}

		let user = new User(data)

		user.save(function(err, doc) {
			if (err) controller.returnResponseError(res,err)

			controller.returnResponseSuccess(res,doc,'Created with Success')

		})
	},


	// ------- SERVICES -------

	searchUserByName : function(req, res, next){

		const name = req.params.name

		User.find({name : {$regex : name, $options: "i" } }).exec(function(err,users){
			if(err)	controller.returnResponseError(res,err)

			controller.returnResponseSuccess(res,users)
		})

	},



}

module.exports = UserController
