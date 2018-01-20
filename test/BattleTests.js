process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai          = require('chai'),
  server            = require('../index'),
  mongoose          = require('mongoose'),
  User              = mongoose.model('User'),
  Round             = mongoose.model('Round'),
  BracketService    = require('../api/services/BracketService'),
  Battle            = mongoose.model('Battle')

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

  describe('/POST battle', () => {

    const mockup = function () {
      let users = []
      users.push(new User({"name":"teste1","email":"teste@teste.com","gender":"mano","user_level":1, "virgin": true }))
      users.push(new User({"name":"teste2","email":"teste@teste.com","gender":"mano","user_level":1, "virgin": true }))
      users.push(new User({"name":"teste3","email":"teste@teste.com","gender":"mina","user_level":1, "virgin": true }))
      users.push(new User({"name":"teste4","email":"teste@teste.com","gender":"mina","user_level":1, "virgin": true }))
      users.push(new User({"name":"teste5","email":"teste@teste.com","gender":"mina","user_level":1}))
      users.push(new User({"name":"teste6","email":"teste@teste.com","gender":"mina","user_level":1}))
      users.push(new User({"name":"teste7","email":"teste@teste.com","gender":"mina","user_level":1}))
      users.push(new User({"name":"teste8","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste9","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste10","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste11","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste12","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste13","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste14","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste15","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste16","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste17","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste18","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste19","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste20","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste21","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste22","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste23","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste24","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste25","email":"teste@teste.com","gender":"mano","user_level":1}))
      users.push(new User({"name":"teste26","email":"teste@teste.com","gender":"mano","user_level":1}))

      return users
    }

    it('it should create battle', (done) => {

      let users = mockup()
      let bracket = BracketService.firstStage(users)
      console.log(bracket)
      let battle  = new Battle({
        'name': 'test',
        'description': 'first test',
        'brackets': bracket
      })
      chai.request(server)
        .post('/battle/')
        .send(battle)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done();
        });
    })
  })

  describe('GET', () => {
  })
  describe('/PUT/:id battle', () => {
  })
  describe('/DELETE/:id user', () => {
  })

})
