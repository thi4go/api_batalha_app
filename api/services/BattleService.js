const mongoose = require('mongoose'),
  Bracket  = mongoose.model('Bracket'),
  Battle   = mongoose.model('Battle'),
  service  = require('./Service'),
  BracketService = require('../services/BracketService')

const BattleService = {

  getAllBattles(){
    return service.getAllPopulating(Battle,'brackets')
  },
  deleteBattle(id){
    return service.deleteById(Battle,id)
  },
  instantiateBattle(data) {

    bracket = BracketService.firstStage(data.usersSubscribed)

    battle  = new Battle({
      'name': data.name,
      'description': data.description,
      'brackets': bracket
    })

    return battle
  }
}

module.exports = BattleService
