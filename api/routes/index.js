
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


 /*
  * ROUTES
  */

 /*
  * rounds
  */

server.get('/rounds',    roundController.getAll)
server.get('/round/:id', roundController.getById)

/*
 * BATTLES
 */

// REST
server.get('/battles',     battleController.getAll)
server.get('/battle/:id',  battleController.getById)
server.put('/battle/:id',  battleController.update)
server.del('/battle/:id',  battleController.delete)
server.post('/battle',     battleController.createBattle)

// SERVICES
server.get('/battle/get-latest-battle',    battleController.getLastestBattle)
server.post('/battle/update-round-winner', battleController.updateRoundWinner)


/*
 * BRACKETS
 */

//REST
server.get('/brackets',     bracketController.getAll)
server.get('/bracket/:id',  bracketController.getById)
server.put('/bracket/:id',  bracketController.update)
server.del('/bracket/:id',  bracketController.delete)


/*
 * USER
 */

//REST
server.get('/users',      userController.getAll)
server.get('/user/:id',  userController.getById)
server.put('/user/:id',  userController.update)
server.del('/user/:id',  userController.delete)
server.post('/user',     userController.createUser)

server.post('/user/search-user-by-name',       userController.searchUserByName)


/*
 * groups
 */

server.post('/group/create-group',                groupController.createGroup)
server.get('/group/get-all-groups',               groupController.getAllGroups)
server.get('/group/get-group-by-id/:group_id',    groupController.getGroupById)
server.put('/group/update-group-by-id/:group_id', groupController.updateGroupById)
server.del('/group/delete-group-by-id/:group_id', groupController.deleteGroupById)

/*
 * images
 */

server.post('/image/create-image',                imageController.createImage)
server.get('/image/get-all-images',               imageController.getAllImages)
server.get('/image/get-image-by-id/:image_id',    imageController.getImageById)
server.put('/image/update-image/:image_id',       imageController.updateImage)
server.del('/image/delete-image/:image_id',       imageController.deleteImage)

/*
 * videos
 */

server.post('/video/create-video',                videoController.createVideo)
server.get('/video/get-all-videos',               videoController.getAllVideos)
server.get('/video/get-video-by-id/:video_id',    videoController.getVideoById)
server.put('/video/update-video/:video_id',       videoController.updateVideo)
server.del('/video/delete-video/:video_id',       videoController.deleteVideo)
