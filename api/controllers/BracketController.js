'use strict';


const Controller  = require('./Controller'),
  mongoose        = require('mongoose'),
  RoundController = require('./RoundController'),
  BracketService  = require('../services/BracketService'),
  Service         = require('../services/Service'),
  Bracket 		    = mongoose.model('Bracket'),
  Round           = mongoose.model('Round')

const BracketController = {

  // ------- RESTful ROUTES -------

  getAll (req, res, next) {
    Controller.getAll(Bracket, res)
  },

  getById (req, res, next) {
    const id = req.params.id

    Controller.getById(Bracket, res, id)
  },

  update (req, res, next) {
    const id   = req.params.id
    const data = req.body

    Controller.update(Bracket, res, id, data)
  },

  delete (req, res, next) {
    const id = req.params.id

    Controller.delete(Bracket, res, id)
  },


  // ------- SERVICES -------

  saveBracket (bracket, stage){
    let rounds = bracket[stage]
    for (var i = 0, len = rounds.length; i < len; i++) {
      RoundController.saveRound(rounds[i])
    }
    bracket.save(function(err){
      if(err) throw err
    })
  },

  updateBracket (res, bracket_id, round_id, user){

    var bracket = null
    var round   = null
    var nextStage

    RoundController.setRoundWinner(round_id, user)

    Promise.all([
      Service.getById(Bracket, bracket_id),
      Service.getById(Round, round_id)
    ]).then( result => {
      bracket = result[0]
      round   = result[1]

      nextStage = BracketService.getNextStageUpdated(bracket, round, user)

      RoundController.saveOrUpdateRound(nextStage.round)
    }).then( _ => {
      bracket[nextStage.name] = nextStage.rounds
      Bracket.findOneAndUpdate({_id : bracket._id}, bracket, function(err, doc){
        if(err) throw err
      })

      Controller.returnResponseSuccess(res, nextStage, 'Updated Succesfully');
    }).catch( err => {
      throw err
    })

  }
}


module.exports = BracketController
