'use strict';


const _             = require('lodash'),
  mongoose          = require('mongoose'),
  Controller        = require('./Controller'),
  Service           = require('../services/Service'),
  StageController   = require('./StageController'),
  RoundController   = require('./RoundController'),
  StageService      = require('../services/StageService'),
  Battle            = mongoose.model('Battle'),
  Stage             = mongoose.model('Stage'),
  Round             = mongoose.model('Round'),
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

  async delete (req, res, next) {
    const id = req.params.id

    let resp = await Battle.findOne({_id: id})

    for (let stage of resp.stages) {
      for (let round of stage.rounds) {
        await Round.remove({_id: round._id})
      }
      await Stage.remove({_id: stage._id})
    }

    Controller.delete(Battle, res, id)
  },

  async createBattle (req, res, next) {
    const data = req.body

    try {
      const generated = StageService.firstStage(data.users)
      let stages = generated.stages
      let phases = generated.phases

      let battle  = new Battle({
        'name': data.name,
        'description': data.description,
        'stages': stages,
        'phases': phases
      })

      for (var i = 0, len = stages.length; i < len; i++) {
        StageController.saveStage(res, battle.stages[i])
      }

      battle.save(function(err){
        if(err) Controller.returnResponseError(res,err)

        Battle.findOne({_id: battle._id})
          .exec(function(err, doc) {
            if(err) Controller.returnResponseError(res,err)
            Controller.returnResponseSuccess(res, doc, 'Battle instantiated')
          })
      })

    } catch (err) {
      console.log(err)
      Controller.returnResponseError(res,err)
    }
  },


  // ------- SERVICES -------

  async setInactiveBattle (req, res, next) {
    const battle = Battle.find({_id: req.body.battle_id})

    
  },

  updateRoundWinner (req, res, next){
    const battle_id  = req.body.battle_id
    const round_id   = req.body.round_id
    const user_id    = req.body.user_id

    try {
      Promise.all([
        Service.getById(User, user_id),
        Service.getById(Battle, battle_id),
        Service.getById(Round, round_id)
      ]).then( result => {
        let user   = result[0]
        let battle = result[1]
        let round  = result[2]
        const stages = battle.stages
        const curr = round.stage
        RoundController.setRoundWinner(round_id, user)
        if (curr + 1 == battle.phases){
          BattleController.setBattleWinner(res, battle, user)
        }
        else{
          StageController.updateStage(res, stages, battle_id, curr + 1, user)
        }
    })
    } catch(err) {
      console.log(err)
      return Controller.returnResponseError(res, err)
    }
  },

  setBattleWinner (res, battle, user){
    Battle.findOneAndUpdate({ _id: battle._id }, {'winner': user}, function(err, doc) {
      if (err) throw err
      else if (!doc) throw new Error('Battle not found')
      Controller.returnResponseSuccess(res, battle, 'Battle winner updated successfully');
    })
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
