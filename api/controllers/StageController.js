'use strict';


const Controller  = require('./Controller'),
  mongoose        = require('mongoose'),
  RoundController = require('./RoundController'),
  StageService    = require('../services/StageService'),
  Service         = require('../services/Service'),
  Stage 		      = mongoose.model('Stage'),
  Round           = mongoose.model('Round'),
  Battle          = mongoose.model('Battle')

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

  saveStage (res, stage){
    let rounds = stage['rounds']

    for (var i = 0, len = rounds.length; i < len; i++) {
      RoundController.saveRound(rounds[i])
    }
    stage.save(function(err){
      if(err) throw err
    })
  },

  updateStage (res, stages, battle_id, phase, user){

    Service.getById(Stage, stages[phase]).then(result => {
      let stage = result
      const nextStage = StageService.getNextStageUpdated(stages, phase, user)

      RoundController.saveOrUpdateRound(nextStage.round).then( _ => {
        stage.rounds = nextStage.rounds
        Stage.findOneAndUpdate({_id : stage._id}, stage, function(err, doc){
          if(err) throw err
          Battle.findOne({_id: battle_id}, function(err, doc) {
            Controller.returnResponseSuccess(res, doc, 'Round winner updated successfully');
          })
        })
      })
    })


  }
}


module.exports = StageController
