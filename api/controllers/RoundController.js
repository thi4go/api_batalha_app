'use strict';

const Controller   = require('./Controller'),
      mongoose     = require('mongoose'),
      Round 		   = mongoose.model('Round')


const RoundController = {

  // ------- RESTful ROUTES -------

  getAll (req, res, next) {
    Controller.getAll(Round, res)
  },

  getById (req, res, next) {
    const id = req.params.id

    Controller.getById(Round, res, id)
  },

  update (req, res, next) {
    const id   = req.params.id
    const data = req.body

    Controller.update(Round, res, id, data)
  },

  delete (req, res, next) {
    const id = req.params.id

    Controller.delete(Round, res, id)
  },


  // ------- SERVICES -------

  setRoundWinner(round_id, user){
    Round.findOneAndUpdate({ _id: round_id }, {'winner': user}, function(err, doc) {
      if (err) throw err
      else if (!doc) throw new Error('Round not found')
    })
  },

  saveRound(round){
    round.save(function(err){
      if(err) throw err
    })
  },

  saveOrUpdateRound(round){
    return new Promise( (resolve, reject) => {
      Round.findById(round._id, function(err, doc) {
        if (err) reject(err)
        if(!doc){
          //create
          RoundController.saveRound(round)
        }
        else{
          //update
          doc.second = round.second
          doc.third  = round.third
          Round.findOneAndUpdate({_id : doc._id}, doc, function(err, doc){
            if(err) throw err
          })
        }
        resolve(doc)
      })
    })
  }
}


module.exports = RoundController
