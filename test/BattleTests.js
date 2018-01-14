process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai'),
  server   = require('../index'),
  mongoose = require('mongoose'),
  Battle   = mongoose.model('Battle')

describe('Battle', () => {

  after( done => {
    Battle.remove({}, (err) => {
       done()
    })
  })

})
