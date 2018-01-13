process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai'),
  chaiHttp = require('chai-http'),
  server   = require('../index'),
  mongoose = require('mongoose'),
  Round    = mongoose.model('User')

chai.use(chaiHttp);

describe('Users', () => {

  const user1 = new User({"name":"teste1","email":"teste1@teste.com","gender":"mano","user_level":1})
  const user2 = new User({"name":"teste2","email":"teste2@teste.com","gender":"mano","user_level":1})
	const user3 = new User({"name":"teste3","email":"teste3@teste.com","gender":"mina","user_level":1})
	const user4 = new User({"name":"teste4","email":"teste4@teste.com","gender":"mina","user_level":1})
	const user5 = new User({"name":"teste5","email":"teste5@teste.com","gender":"mina","user_level":1})
	const user6 = new User({"name":"teste6","email":"teste6@teste.com","gender":"mano","user_level":1})

  const round1 = new Round({"first": user1, "second": user2, "third": user3, "stage": 0})
  const round2 = new Round({"first": user2, "second": user4, "third": user5, "stage": 0})
  const round3 = new Round({"first": user1, "second": user2, "stage": 1})
  const round4 = new Round({"first": user3, "second": user4, "stage": 2})


  after( done => {
    Round.remove({}, (err) => {
       done()
    })
  })

  describe('/GET rounds', () => {

    it('it should GET all rounds', (done) => {
      chai.request(server)
        .get('/rounds')
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

  })

  describe('/PUT/:id user', () => {

    it('it should UPDATE a user given the id', (done) => {
      chai.request(server)
        .put('/user/' + user._id)
        .send({"name": "testeupdate", "email": "testeUpdate@teste.com"})
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('name').eql('teste update')
          res.body.should.have.property('email').eql('testeUpdate@teste.com')
          done()
        })
    })
  })

  describe('/DELETE/:id user', () => {

    it('it should DELETE a user given the id', (done) => {
      chai.request(server)
        .delete('/user/' + user._id)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })

})
