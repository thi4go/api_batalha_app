
'use strict'

/**
 * Module Dependencies
 */
const _    = require('lodash'),
  errors   = require('restify-errors')

/**
 * Model Schema
 */
const User    = require('../models/User'),
      Group   = require('../models/Group'),
      Bracket = require('../models/Bracket'),
      Round   = require('../models/Round'),
      Battle  = require('../models/Battle'),
      Image   = require('../models/Image'),
      Video   = require('../models/Video'),
      News    = require('../models/News')

/**
 * Controllers
 */

const userController    = require('../controllers/UserController'),
      groupController   = require('../controllers/GroupController'),
      bracketController = require('../controllers/BracketController'),
      roundController   = require('../controllers/RoundController'),
      battleController  = require('../controllers/BattleController'),
      imageController   = require('../controllers/ImageController'),
      videoController   = require('../controllers/VideoController'),
      newsController    = require('../controllers/NewsController')




/*       /*
* ROUTES *
*/       /*


/*
* Microservices routes
*/

server.get('/get-active-battle',    battleController.getLastestBattle)
server.post('/update-round-winner', battleController.updateRoundWinner)
server.post('/search-user-by-name', userController.searchUserByName)


/*
* RESTful routes for dabatase models
*/

// ROUNDS
server.get('/rounds',    roundController.getAll)
server.get('/round/:id', roundController.getById)

// BATTLES
server.get('/battles',     battleController.getAll)
server.get('/battle/:id',  battleController.getById)
server.put('/battle/:id',  battleController.update)
server.del('/battle/:id',  battleController.delete)
server.post('/battle',     battleController.createBattle)


// BRACKETS
server.get('/brackets',     bracketController.getAll)
server.get('/bracket/:id',  bracketController.getById)
server.put('/bracket/:id',  bracketController.update)
server.del('/bracket/:id',  bracketController.delete)


// USER
server.get('/users',      userController.getAll)
server.get('/user/:id',  userController.getById)
server.put('/user/:id',  userController.update)
server.del('/user/:id',  userController.delete)
server.post('/user',     userController.createUser)


// GROUPS
server.get('/groups',     groupController.getAll)
server.get('/group/:id',  groupController.getById)
server.put('/group/:id',  groupController.update)
server.del('/group/:id',  groupController.delete)
server.post('/group',     groupController.createGroup)


// IMAGES
server.get('/images',     imageController.getAll)
server.get('/image/:id',  imageController.getById)
server.put('/image/:id',  imageController.update)
server.del('/image/:id',  imageController.delete)
server.post('/image',     imageController.createImage)


// VIDEOS
server.get('/videos',     videoController.getAll)
server.get('/video/:id',  videoController.getById)
server.put('/video/:id',  videoController.update)
server.del('/video/:id',  videoController.delete)
server.post('/video',     videoController.createVideo)
