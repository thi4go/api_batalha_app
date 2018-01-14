process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai'),
  wait     = require('sleep'),
  server   = require('../index'),
  mongoose = require('mongoose'),
  User 	   = mongoose.model('User')

describe('Users', () => {

  const user = new User({"name":"teste","email":"teste@teste.com","gender":"mano","user_level":1})
  const euser = new User({"name":"tt","email":"teste@teste.com","gender":"mano","user_level":1})
  const nuser = new User({"gender": "tt"})
  const guser = new User({"name": "tt"})

  before(done => {
    User.remove({}, (err) => {
      done()
    })
  })

  it('it should NOT have any users', (done) => {
    chai.request(server)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.length(0)
        done()
      })
  })

  describe('/POST user', () => {

    it('it should create a user', (done) => {
      chai.request(server)
        .post('/user/')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done();
        });
    })

    it('it should NOT create a user with repeated name', (done) => {
      chai.request(server)
        .post('/user/')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          done();
        });
    })

    it('it should NOT create a user with repeated email', (done) => {
      chai.request(server)
        .post('/user/')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          done();
        });
    })

    it('it should NOT create a user without name field', (done) => {
      chai.request(server)
        .post('/user/')
        .send(nuser)
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.errors.should.have.property('name')
          res.body.error.errors.name.should.have.property('kind').eql('required')
          done();
        })
    })

    it('it should NOT create a user without gender field', (done) => {
      chai.request(server)
        .post('/user/')
        .send(guser)
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.errors.should.have.property('gender')
          res.body.error.errors.gender.should.have.property('kind').eql('required')
          done();
        })
    })

    it('it should get a user given the name part', (done) => {
      let name = {"name": "tes"}

      chai.request(server)
        .post('/search-user-by-name')
        .send(name)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.should.have.length(1)
          res.body.forEach(user =>{
            user.should.have.property('name', 'teste')
          })
          done()
        })
    })

    it('it should NOT get a user given the name part', (done) => {
      let name = {"name": "foo"}

      chai.request(server)
        .post('/search-user-by-name')
        .send(name)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.should.have.length(0)
          done()
        })
    })

    const users = [new User({"name":"teste1","email":"teste1@teste.com","gender":"mano","user_level":1}),
      new User({"name":"teste2","email":"teste2@teste.com","gender":"mano","user_level":1}), 
      new User({"name":"teste3","email":"teste3@teste.com","gender":"mina","user_level":1}),
      new User({"name":"teste4","email":"teste4@teste.com","gender":"mina","user_level":1}),
      new User({"name":"teste5","email":"teste5@teste.com","gender":"mina","user_level":1}),
      new User({"name":"teste6","email":"teste6@teste.com","gender":"mano","user_level":1})]

    it('it should create 6 users', (done) => {
      users.forEach(u => {
        chai.request(server)
          .post('/user/')
          .send(u)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
          });
      })
        done();
    })

  })

  describe('/GET users', () => {

    it('it should GET all the users', (done) => {
      wait.msleep(10)
      chai.request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.length(7)
          done()
        })
    })

    it('it should GET user by id', (done) => {
      chai.request(server)
        .get('/user/' + user._id)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('name')
          res.body.should.have.property('email')
          res.body.should.have.property('gender')
          res.body.should.have.property('user_level')
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
          res.body.should.have.property('name').eql('testeupdate')
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
