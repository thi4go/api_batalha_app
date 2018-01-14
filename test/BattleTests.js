process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai'),
  server   = require('../index'),
  mongoose = require('mongoose'),
  User     = mongoose.model('User'),
  Round    = mongoose.model('Round'),
  Battle   = mongoose.model('Battle')

describe('Battle', () => {


})
