
'use strict'

const devEnv  = require('./config/dev.json')
const testEnv = require('./config/test.json')

if(process.env.NODE_ENV == 'test')
  process.env.NODE_ENV = testEnv.NODE_ENV
else if(!process.env.NODE_ENV)
  process.env.NODE_ENV = devEnv.NODE_ENV


module.exports = {
    name: 'API',
    version: '0.0.1',
    env: process.env.NODE_ENV ,
    port: process.env.PORT || devEnv.PORT,
    jwt_secret: 'battleofbattles',
    base_url: process.env.BASE_URL || devEnv.BASE_URL,
    db: {
        // uri: 'mongodb://127.0.0.1:27017/api_batalha_app',
        uri: devEnv.DB_HOST,
    },
}
