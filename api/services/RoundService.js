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
    let phase = {'rounds': null, 'name': null}
    switch (n) {
      case 4:
      case 5:
        phase.rounds = 2
        phase.name = 'semi_final'
        break;
      case 6:
      case 7:
        phase.rounds = 3
        phase.name = 'semi_final'
        break;
      case 8:
      case 9:
        phase.rounds = 4
        phase.name = 'quarter_final'
        break;
      case 10:
      case 11:
        phase.rounds = 5
        phase.name = 'quarter_final'
        break;
      case 12:
      case 13:
        phase.rounds = 6
        phase.name = 'quarter_final'
        break;
      case 14:
      case 15:
        phase.rounds = 7
        phase.name = 'quarter_final'
        break;
      default: // n < 4
        phase.rounds = 1
        phase.name = 'finale'
    }
    return phase
  }
}

module.exports = RoundService
