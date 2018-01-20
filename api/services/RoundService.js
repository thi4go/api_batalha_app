const mongoose  = require('mongoose'),
  User 	    = mongoose.model('User'),
  Round     = mongoose.model('Round'),
  randomize = require ('../utils/Random'),
  MapRound  = require('../utils/MapRound')


const RoundService = {

  // ** Insert user at round i ** //
  roundInsert (i, user, rounds, stage) {
    if(rounds[i] == null)
      rounds[i] = new Round({'first': user, 'second': null, 'stage' : stage})
    else if(rounds[i].second == null) rounds[i].second = user
    else rounds[i].third  = user
  },

  // ** Organize the selected users in the initial bracket
  rounds (fighters, numrounds = 8) {
    let n 	   = 0
    let r      = 0
    let mod    = 0
    let rounds = []
    let bn     = fighters.length

    while(bn > 0) {
      r   = randomize(0, fighters.length-1)
      mod = n%numrounds
      RoundService.roundInsert(mod, fighters[r], rounds, MapRound.STAGEKEY.FIRST_STAGE)
      fighters.splice(r, 1)
      n++
      bn--
    }

    return rounds
  },

  defineLowRounds (n) {
    switch (n) {
      case 4:
      case 5:
        return 2
        break;
      case 6:
      case 7:
        return 3
        break;
      case 8:
      case 9:
        return 4
        break;
      case 10:
      case 11:
        return 5
        break;
      case 12:
      case 13:
        return 6
        break;
      case 14:
      case 15:
        return 7
        break;
      default: //n<=4
        return 1
    }
  }
}

module.exports = RoundService
