'use strict';


const Controller  = require('./Controller'),
  mongoose        = require('mongoose'),
  RoundController = require('./RoundController'),
  StageService  = require('../services/StageService'),
  Service         = require('../services/Service'),
  Stage 		    = mongoose.model('Stage'),
  Round           = mongoose.model('Round')

const StageController = {

  // ------- RESTful ROUTES -------

  getAll (req, res, next) {
    Controller.getAll(Stage, res)
  },

  getById (req, res, next) {
    const id = req.params.id

    Controller.getById(Stage, res, id)
  },

  update (req, res, next) {
    const id   = req.params.id
    const data = req.body

    Controller.update(Stage, res, id, data)
  },

  delete (req, res, next) {
    const id = req.params.id

    Controller.delete(Stage, res, id)
  },


  // ------- SERVICES -------

  saveStage (res, stage, label){
    let rounds = stage['rounds']
    console.log(rounds)

    for (var i = 0, len = rounds.length; i < len; i++) {
      RoundController.saveRound(rounds[i])
    }
    stage.save(function(err){
      if(err) throw err
    })
  },

  updateStage (res, stage_id, round_id, user){

    var stage = null
    var round   = null
    var nextStage

    RoundController.setRoundWinner(round_id, user)

    Promise.all([
      Service.getById(Stage, stage_id),
      Service.getById(Round, round_id)
    ]).then( result => {
      stage = result[0]
      round   = result[1]

      nextStage = StageService.getNextStageUpdated(stage, round, user)

      RoundController.saveOrUpdateRound(nextStage.round).then( _ => {
        stage[nextStage.name] = nextStage.rounds
        Stage.findOneAndUpdate({_id : stage._id}, stage, function(err, doc){
          if(err) throw err

          Stage.findOne({_id: stage._id}).then(doc => {
            Controller.returnResponseSuccess(res, doc, 'Round winner updated successfully');
          }).catch( err => {
            Controller.returnResponseError(res, err)
          })
        })
    })


    }).catch( err => {
      throw err
    })

  }
}


module.exports = StageController

