process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai'),
  server   = require('../index'),
  mongoose = require('mongoose'),
  User     = mongoose.model('User'),
  Round    = mongoose.model('Round'),
  Battle   = mongoose.model('Battle')

describe('Battle', () => {

  before(done => {
    Battle.remove({}, (err) => {
      done()
    })
  })

  it('it should NOT have any battle', (done) => {
    chai.request(server)
      .get('/battles')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.length(0)
        done()
      })
  })

})
