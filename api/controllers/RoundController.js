'use strict';

const controller     = require('./Controller'),
      mongoose       = require('mongoose'),
	  Round 		 = mongoose.model('Round'),
      RoundService   = require('../services/RoundService')


const RoundController = {

	setRoundWinner(round_id, user){
		Round.findOneAndUpdate({ _id: round_id }, {'winner': user}, function(err, doc) {
			if (err) throw err
			else if (!doc) throw new Error('Round not found')
        })
    },

    saveRound(round){
        round.save(function(err){
            if(err) throw err
        })
    },

    getRoundById(round_id){
		return new Promise( (resolve, reject) => {
			Round.findById(round_id, function(err, doc) {
				if (err) reject(err)
				resolve(doc)
			})
		})
    },

    _getRoundById : function(req, res, next){
        let round_id = req.params.round_id
        
        Round.findOne({_id: round_id})
             .populate('first second third winner')
             .exec(function(err, doc) {
                 if(err) controller.returnResponseError(res,err);
                 controller.returnResponseSuccess(res, doc, 'Round populated');
              })
    },

    _getAllRounds : function(req, res, next) {
        Round.find({}).exec(function(err,rounds){
            if(err) controller.returnResponseError(res,err)
            if(!rounds) controller.returnResponseNotFound(err,next)
            let roundMap = {}
            rounds.forEach(function(round){
                roundMap[round._id] = round
            })
            controller.returnResponseSuccess(res,roundMap)
        })
    },

    saveOrUpdateRound(round){
		return new Promise( (resolve, reject) => {
			Round.findById(round._id, function(err, doc) {
				if (err) reject(err)
				if(!doc){
                    //create
                    RoundController.saveRound(round)
                }
                else{
                    //update
                    doc.second = round.second
                    Round.findOneAndUpdate({_id : doc._id}, doc, function(err, doc){
                        if(err) throw err
                    })
                }
                resolve(doc)
			})
		})
    }
}


module.exports = RoundController
