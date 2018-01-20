const mongoose = require('mongoose'),
User 	   = mongoose.model('User'),
Bracket  = mongoose.model('Bracket'),
Round    = mongoose.model('Round'),
RoundService = require('./RoundService'),
randomize = require('../utils/Random'),
MapRound = require('../utils/MapRound')

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

const BracketService = {

	// ** Main function to select MC's at first stage
	firstStage(users) {
		let n = users.length
		var firstStage

		if(n <= 16) {
			// ** Organize the few fighters the best we can:
			let numrounds = RoundService.defineLowRounds(n)
			firstStage = RoundService.rounds(users, numrounds)
		}
		else {
			if(n < 25) count = 16
			else if(n >= 25) count = 20

			// ** Lottery:
			let theChosenOnes = timeToShine(users)
			firstStage = RoundService.rounds(theChosenOnes)
		}

		let brackets = new Bracket({'first_stage': firstStage})

		return brackets
	},

	/* Find the current stage
	* Check if any vacant round to put user
	* If not, create a new round
	* return the new stage updated
	*/
	getNextStageUpdated(bracket, round, user){
		const stageKey = round.stage + 1
    const crrStg   = MapRound.STAGESTR[round.stage] // current stage e.g: semi_final
    const numcurr  = bracket[crrStg].length         // number of rounds in current stage
		const stageStr = MapRound.STAGESTR[stageKey]    // next stage e.g: finale
		const rounds   = bracket[stageStr]

		var i = 0
    var bound = Math.floor(numcurr/2) - 1

		while(rounds[i] != null && rounds[i].second != null && i < bound) i++ 

		RoundService.roundInsert(i, user, rounds, stageKey)

		const nextStage = {rounds : rounds, round : rounds[i], name : stageStr}

		return nextStage
	}
}


module.exports = BracketService
