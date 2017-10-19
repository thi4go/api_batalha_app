
'use strict';


const controller = require('./Controller'),
	_ 	     = require('lodash'),
	mongoose   = require('mongoose'),
	Group 	 = mongoose.model('Group'),
	User 	 	 = mongoose.model('User')


const GroupController = {

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

	},

	getAllGroups : function(req, res, next) {
		Group.find({}).populate('_members').exec(function(err,groups){

		  if(err)
			  controller.returnResponseError(res,err)

		  let groupMap = {}

			groups.forEach(function(group){
				groupMap[group._id] = group
			})

      controller.returnResponseSuccess(res,groupMap)
		})
	},
	getGroupById : function(req, res, next) {

		const id = req.params.group_id
		controller.getById(Group, id, req, res, next)

	},
	updateGroupById : function(req, res, next) {

		let data = req.body || {}
		let id   = req.params.group_id

		controller.updateById(Group, id, data, req, res, next)

	},
	deleteGroupById : function(req, res, next) {

		let id = req.params.group_id
		controller.deleteById(Group, id, req, res, next)

	},
}

module.exports = GroupController
