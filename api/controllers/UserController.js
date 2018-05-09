
'use strict';


const Controller = require('./Controller'),
		  mongoose   = require('mongoose'),
			bcrypt     = require('bcrypt'),
			User 	     = mongoose.model('User'),
			Battle     = mongoose.model('Battle')


const UserController = {

	// ------- RESTful ROUTES -------

	getAll (req, res, next) {
		Controller.getAll(User, res)
	},

	getById (req, res, next) {
		const id = req.params.id

		Controller.getById(User, res, id)
	},

	async update (req, res, next) {
		const id   = req.params.id
		let data   = req.body

		try {
			if (data.password) {
				let salt = await bcrypt.genSalt(10)
				let hash = await bcrypt.hash(data.password, salt)
				data.password = hash
			}

			await User.findOneAndUpdate({_id: id}, data)

			let user = await User.findOne({ _id: id })

			Controller.returnResponseSuccess(res, user)
		} catch (err) {
			Controller.returnResponseError(res, err)
		}
	},

	async isUnique (req, res, next) {
		const name = req.params.name

		let user = await User.find({name: name})

		if (user.length == 0) {
			res.send(200, 'true')
			return
		}
		res.send(200, 'false')
		return
	},

	delete (req, res, next) {
		const id = req.params.id

		Controller.delete(User, res, id)
	},

	createUser (req, res, next) {
		let data = req.body || {}

		let user = new User(data)

		user.save(function(err, doc) {
			if (err) Controller.returnResponseError(res,err)
			else Controller.returnResponseSuccess(res,doc,'Created with Success')
		})
	},


	// ------- SERVICES -------

	searchUserByName (req, res, next) {

		const name = req.params.name

		User.find({name : {$regex : name, $options: "i" } }).exec(function(err,users){
			if (err) Controller.returnResponseError(res,err)
			else Controller.returnResponseSuccess(res,users)
		})

	},

	async statistics (req, res, next) {

		const id = req.params.id

		const user = await User.find({_id: id})

		res.json(user)

	}



}

module.exports = UserController
