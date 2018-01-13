
'use strict';


const Controller = require('./Controller'),
	mongoose   = require('mongoose'),
	Group 	 = mongoose.model('Group')


const GroupController = {

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

	createGroup : function(req, res, next) {
		let data = req.body || {}

		let name 	 = data.name
		let groupMembers = data.members


		let group = new Group({name: name})
		group.save(function(err){

			if(err)
				controller.returnResponseError(res,err)

			group._members = groupMembers

			group.save(function(err) {
				if (err)
					controller.returnResponseError(res,err)
			})

		})

		controller.returnResponseSuccess(res,group)

	}

}

module.exports = GroupController
