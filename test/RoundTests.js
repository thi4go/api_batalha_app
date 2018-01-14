process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai'),
  chaiHttp = require('chai-http'),
  server   = require('../index'),
  mongoose = require('mongoose'),
  Round    = mongoose.model('Round'),
  User     = mongoose.model('User')


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


})
