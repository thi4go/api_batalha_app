
'use strict'

/**
 * Module Dependencies
 */
const jwt = require('jsonwebtoken')


/**
 * Model Schema
 */
const User    = require('../models/User'),
      Group   = require('../models/Group'),
      Round   = require('../models/Round'),
      Battle  = require('../models/Battle'),
      Image   = require('../models/Image'),
      Video   = require('../models/Video'),
      News    = require('../models/News'),
      Stage   = require('../models/Stage')

/**
 * Controllers
 */

const userController    = require('../controllers/UserController'),
      groupController   = require('../controllers/GroupController'),
      roundController   = require('../controllers/RoundController'),
      battleController  = require('../controllers/BattleController'),
      imageController   = require('../controllers/ImageController'),
      videoController   = require('../controllers/VideoController'),
      newsController    = require('../controllers/NewsController'),
      authController    = require('../controllers/AuthController'),
      stageController   = require('../controllers/StageController')




/*       /*
* ROUTES *
*/       /*


/*
* Middleware
*/

const auth = (req, res, next) => {
  let token = req.header('User-Token')

  jwt.verify(token, 'battleofbattles', (err, data) => {
    if (err) res.send(401, {error: 'invalid authentication token'})
    else next()
  })
}

/*
* Microservices routes
*/

server.get('/generate-ranking',    battleController.generateRanking)

server.get('/get-active-battle',    battleController.getLastestBattle)
server.post('/set-inactive-battle', battleController.setInactiveBattle)
server.post('/update-round-winner', battleController.updateRoundWinner)

server.get('/user-statistics/:id',  userController.statistics)
server.post('/search-user-by-name', userController.searchUserByName)

server.post('/upload-image', imageController.createImage)
/*
* Authentication routes
*/

server.post('/login',    authController.login)
server.post('/register', authController.register)
server.post('/verify', authController.verify)

/*
* RESTful routes for dabatase models
*/

// ROUNDS
server.get('/rounds',    roundController.getAll)
server.get('/round/:id', roundController.getById)
server.put('/round/:id', roundController.update)
server.del('/round/:id', roundController.delete)

// BATTLES
server.get('/battles',     battleController.getAll)
server.get('/battle/:id',  battleController.getById)
server.put('/battle/:id',  battleController.update)
server.del('/battle/:id',  battleController.delete)
server.post('/battle',     battleController.createBattle)

// STAGES
server.get('/stages',     stageController.getAll)
server.get('/stage/:id',  stageController.getById)
server.put('/stage/:id',  stageController.update)
server.del('/stage/:id',  stageController.delete)


// STAGES
server.get('/stages',     stageController.getAll)
server.get('/stages/:id', stageController.getById)


// USER
server.get('/users',     userController.getAll)
server.get('/user/:id',  userController.getById)
server.get('/user/unique/:name',  userController.isUnique)
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
