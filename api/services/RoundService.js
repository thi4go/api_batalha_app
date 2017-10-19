const mongoose  = require('mongoose'),
	  User 	    = mongoose.model('User'),
	  Round     = mongoose.model('Round'),
      randomize = require ('../utils/Random'),
      MapRound  = require('../utils/MapRound')


const RoundService = {
    roundInsert (i, user, rounds, stage) {
        if(rounds[i] == null)
            rounds[i] = new Round({'first': user, 'second': null, 'stage' : stage})
        else if(rounds[i].second == null)
            rounds[i].second = user
        else
            rounds[i].third  = user
    },

    // ** Organize the selected users in the initial bracket
    rounds (fighters, numrounds = 8) {
        let n 	   = 0
        let r      = 0
        let mod    = 0
        let rounds = []
        let bn  = fighters.length

        while(bn != 0) {
            r   = randomize(0, fighters.length-1)
            mod = n%numrounds
            RoundService.roundInsert(mod, fighters[r], rounds, MapRound.STAGEKEY.FIRST_STAGE)
            fighters.splice(r, 1)
            bn--
            n++
        }

        return rounds
    },

    defineLowRounds (n) {
        if ( n < 4 ) return 1
        if ( n >= 4  && n < 7   ) return 2
        if ( n >= 7  && n < 13  ) return 4
        if ( n >= 13 && n <= 16 ) return 8
    }
}

module.exports = RoundService
