const mongoose = require('mongoose'),
User 	         = mongoose.model('User'),
Stage          = mongoose.model('Stage'),
Round          = mongoose.model('Round'),
RoundService   = require('./RoundService'),
randomize      = require('../utils/Random')

var count = 0

const quota = function(users, quotes, luckies) {
	do {
		if(quotes.length == 0) return
		var r     = randomize(0, quotes.length-1)
		var lucky = quotes[r]
		quotes.splice(r, 1)
	} while (luckies.indexOf(lucky) != -1)

	users.splice( users.indexOf(lucky), 1 )
	luckies.push( lucky )
	count--
}

// ** Randomly select users to battle
const timeToShine = function(users) {
	let r	     = 0
	let i 		 = 0
	var girls 	 = []
	var virgins  = []
	var luckies  = []

	users.map( (user) => {
		if (user.gender == 'mina') { girls.push(user) }
		if (user.virgin) { virgins.push(user) }
	})

	for(i = 0; i < 2; i++) { quota(users, girls, luckies) }
	for(i = 0; i < 2; i++) { quota(users, virgins, luckies) }

	while(count != 0) {
		r = randomize(0, users.length-1)
		luckies.push( users[r] )
		users.splice(r, 1)
		count -= 1
	}

	return luckies
}

const StageService = {

	// ** Main function to select MC's at first stage
	firstStage(users) {
		let n         = users.length
    var numStages = 4
		var firstStage

		if(n <= 16) {
			// ** Organize the few fighters the best we can:
			let phase     = RoundService.defineLowRounds(n)
      let numRounds = phase.rounds
      numStages     = phase.stages
			firstStage    = RoundService.rounds(users, numRounds)
		}
		else {
			count = 16

			// ** Lottery:
			let theChosenOnes = timeToShine(users)
			firstStage = RoundService.rounds(theChosenOnes)
		}

		var stages = []
    stages[0] = new Stage({'label': 0, 'rounds': firstStage});
    for (var i = 1, len = numStages; i < len; i++) {
      stages[i] = new Stage({'label': 1, 'rounds': []})
    }

		return {stages: stages, phases: numStages}
	},

	/* Find the current stage
	* Check if any vacant round to put user
	* If not, create a new round
	* return the new stage updated
	*/
	getNextStageUpdated(stages, phase, user){
    var rounds
    const numcurr = stages[phase-1].rounds.length // number of rounds in previos phase
    rounds = stages[phase].rounds

    var i = 0
    var bound = Math.floor(numcurr/2) - 1

    while(rounds[i] != null && rounds[i].second != null && i < bound){ 
      i++ 
    }

    RoundService.roundInsert(i, user, rounds, phase)

    const nextStage = {rounds : rounds, round : rounds[i]}
    return nextStage
	}
}


module.exports = StageService

