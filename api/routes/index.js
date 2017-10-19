
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


 /**
  * Routes
  */

 /*
  * rounds
  */

server.get('/round/get-rounds',                   roundController._getAllRounds)
server.get('/round/get-round-by-id/:round_id',    roundController._getRoundById)

/*
 * battles
 */
server.get('/battles',                             battleController.battles)
server.del('/battle/:id',                          battleController.deleteBattle)

//ARRUMAR
server.get('/battle/get-latest-battle',            battleController.getLastestBattle)
// --
server.get('/battle/get-battles',                  battleController.getAllBattles)
server.get('/battle/get-battle-by-id/:battle_id',  battleController._getBattleById)
server.get('/battle/delete-all-battles',           battleController.deleteAllBattles)
server.put('/battle/end-battle',                   battleController.endBattle)
server.post('/battle/set-winner',                   battleController.setBattleWinner)
server.post('/battle/update-battle',               battleController.updateBattle)
server.post('/battle/make-battle',                 battleController.createBattle)

/*
 * brackets
 */

server.get('/bracket/get-bracket-by-id/:bracket_id',  bracketController._getBracketById)
server.get('/bracket/get-brackets',                   bracketController._getAllBrackets)

/*
 * user
 */

server.post('/user/create-user',               userController.createUser)
server.post('/user/search-user-by-name',       userController.searchUserByName)
server.get('/user/get-all-users',              userController.getAllUsers)
server.get('/user/get-user-by-id/:user_id',    userController._getUserById)
server.put('/user/update-user-by-id/:user_id', userController.updateUserById)
server.del('/user/delete-user-by-id/:user_id', userController.deleteUserById)

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



