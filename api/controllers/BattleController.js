'use strict';


const _             = require('lodash'),
  mongoose          = require('mongoose'),
  Controller        = require('./Controller'),
  Service           = require('../services/Service'),
  BracketController = require('./BracketController'),
  StageController = require('./StageController'),
  BracketService    = require('../services/BracketService'),
  StageService    = require('../services/StageService'),
  MapRound          = require('../utils/MapRound'),
  Battle            = mongoose.model('Battle'),
  User              = mongoose.model('User')


const BattleController = {

  // ------- RESTful ROUTES -------

  getAll (req, res, next) {
    Controller.getAll(Battle, res)
  },

  getById (req, res, next) {
    const id = req.params.id

    Controller.getById(Battle, res, id)
  },

  update (req, res, next) {
    const id   = req.params.id
    const data = req.body

    Controller.update(Battle, res, id, data)
  },

  delete (req, res, next) {
    const id = req.params.id

    Controller.delete(Battle, res, id)
  },

  createBattle (req, res, next) {
    const data = req.body

    try {
      const firststage = StageService.firstStage(data.users)
      let stages = []
      stages[0] = firststage

      let battle  = new Battle({
        'name': data.name,
        'description': data.description,
        'stages': stages
      })

      StageController.saveStage(res, battle.stages[0], 0)

      battle.save(function(err){
        if(err) Controller.returnResponseError(res,err)

        Battle.findOne({_id: battle._id})
          .exec(function(err, doc) {
            if(err) Controller.returnResponseError(res,err)
            Controller.returnResponseSuccess(res, doc, 'Battle instantiated')
          })
      })

    } catch(err) {
      // res.send(err)
      console.log(err)
      Controller.returnResponseError(res,err)
    }
  },


  // ------- SERVICES -------

  updateRoundWinner (req, res, next){
    const battle_id  = req.body.battle_id
    const round_id   = req.body.round_id
    const user_id    = req.body.user_id

    var new_stage

    try {
      Promise.all([
        Service.getById(User, user_id),
        Service.getById(Battle, battle_id)
      ]).then( result => {
        let user       = result[0]
        let bracket_id = result[1].brackets

        BracketController.updateBracket(res, bracket_id, round_id, user)
      })
    } catch(err) {
      return Controller.returnResponseError(res, err)
    }
  },

  getLastBattle (req, res, next) {
    Controller.getAll(Battle, res)
  },

  getLastestBattle (req, res, next) {
    Battle.find({active: true}).sort({created: -1}).limit(1).exec( (err, doc) => {
      if(err) Controller.returnResponseError(res, err)
      Controller.returnResponseSuccess(res, doc, 'Latest Battle returned')
    })
    // Controller.getAll(Battle, res)
  },

}


module.exports = BattleController
