'use strict';


const _    = require('lodash'),
  controller        = require('./Controller'),
  mongoose          = require('mongoose'),
  BracketController = require('./BracketController'),
  UserController    = require('./UserController'),
  battleService     = require('../services/BattleService'),
  MapRound          = require('../utils/MapRound'),
  Battle            = mongoose.model('Battle'),
  User              = mongoose.model('User')


const BattleController = {

  battles(req, res, next){
    battleService.getAllBattles().then(battles=>{
      controller.returnResponseSuccess(res,battles)
    }).catch(err=>{
      return controller.returnResponseError(res,err)
    })
  },

  deleteBattle(req, res, next){
    const id = req.params.id

    battleService.deleteBattle(id).then(response => {
      controller.returnResponseSuccess(res,{},"Deleted successfully")
    }).catch(err => {
      controller.returnResponseError(res, err)
    })
  },

  createBattle : function(req, res, next) {
    let data = req.body;

    let battle = battleService.instantiateBattle(data);

    try {
      BracketController.saveBracket(battle.brackets, MapRound.STAGESTR[0]);
    } catch(err) {
      controller.returnResponseError(res,err);
    }

    battle.save(function(err){
      if(err) controller.returnResponseError(res,err);

      Battle.findOne({_id: battle._id})
        .populate('brackets')
        .populate({
          path: 'brackets',
          populate: {
            path: 'first_stage',
            populate: {
              path: 'first second third'
            }
          }
        })
        .exec(function(err, doc) {
          if(err) controller.returnResponseError(res,err);
          controller.returnResponseSuccess(res, doc, 'Battle instantiated');
        })
    })
  },

  endBattle: function(req, res, next) {
    let battle_id = req.body.battle_id;
    let winner_id = req.body.winner_id;

    Battle.findOneAndUpdate({_id: battle_id}, {active: false}, function(err, doc) {
      if(err) controller.returnResponseError(res, err);
      controller.returnResponseSuccess(res, {}, 'Battle ended with success');
    })
  },

  getAllBattles : function(req, res, next) {
    Battle.find({}).exec(function(err,battles){
      if(err) controller.returnResponseError(res,err);
      if(!battles) controller.returnResponseNotFound(err,next);

      let battleMap = {};

      battles.forEach(function(battle){
        battleMap[battle._id] = battle
      });

      controller.returnResponseSuccess(res,battleMap)
    })
  },

  getBattleById : function(battle_id){
      Battle.findById(battle_id, function(err, doc) {
        if (err) reject(err);
        resolve(doc);
      })
  },

  _getBattleById : function(req, res, next){
    let id = req.params.battle_id;
    controller.getById(Battle, id, req, res, next)
  },

  getBattleWinner : function(req, res, next){
  },

  getAllBattlesByWinner : function(req, res, next){
  },

  updateBattle : function(req, res, next){
    const battle_id  = req.body.battle_id;
    const round_id   = req.body.round_id;
    const user_id    = req.body.user_id;

    var new_stage

    try {
      Promise.all([
        UserController.getUserById(user_id),
        BattleController.getBattleById(battle_id)
      ]).then( result => {
        let user       = result[0];
        let bracket_id = result[1].brackets;

        BracketController.updateBracket(res, bracket_id, round_id, user);

      }).catch( err => {
        return controller.returnResponseError(res, err)
      })

    } catch(err) {
      return controller.returnResponseError(res, err)
    }
  },

  setBattleWinner : function(req, res, next){
    let battle_id = req.body.battle_id
    let user_id   = req.body.user_id

    Battle.findOneAndUpdate({_id: battle_id}, {'winner': user_id}, function(err, doc) {
      if(err) controller.returnResponseError(res, err)

      controller.returnResponseSuccess(res, doc, 'Setted winner for battle')
    })
  },

  getLastestBattle : function(req, res, next){
    //   Battle.findOne({active: true}, function(err, doc) {
    //     if(err) controller.returnResponseError(res, err);
    //     controller.returnResponseSuccess(res, doc, 'Latest Battle returned');
    //   })
    Battle.find({})
      .populate('brackets')
      .populate({
        path: 'brackets',
        populate: {
          path: 'first_stage quarter_final semi_final finale',
          populate: {
            path: 'first second third'
          }

        }
      })
      .sort({ created: -1 })
      .limit(1)
      .exec( (err, doc) => {
        if(err) controller.returnResponseError(res, err)

        controller.returnResponseSuccess(res, doc, 'Latest Battle returned')
      })
  },

  deleteAllBattles : function(req, res, next){
    Battle.remove({}, function(err, doc) {
      if(err) controller.returnResponseError(res, err)

      controller.returnResponseSuccess(res, {}, 'All battles deleted')
    })
  }
}


module.exports = BattleController
