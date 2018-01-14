process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai'),
  server   = require('../index'),
  mongoose = require('mongoose'),
  User     = mongoose.model('User'),
  Round    = mongoose.model('Round')

describe('Rounds', () => {

    //const round1 = new Round({"first": user[1, "second": user2, "third": user3, "stage": 0})
    //const round2 = new Round({"first": user2, "second": user4, "third": user5, "stage": 0})
    //const round3 = new Round({"first": user1, "second": user2, "stage": 1})
    //const round4 = new Round({"first": user3, "second": user4, "stage": 2})


})
