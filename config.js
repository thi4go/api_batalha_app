
'use strict'

const localUri = 'mongodb://127.0.0.1:27017/API_APP_BATALHA'

const devEnv = require('./config/dev.json')

if(!process.env.NODE_ENV)
    process.env.NODE_ENV = devEnv.NODE_ENV


module.exports = {
    name: 'API',
    version: '0.0.1',
    env: process.env.NODE_ENV ,
    port: process.env.PORT || devEnv.PORT,
    base_url: process.env.BASE_URL || devEnv.BASE_URL,
    db: {
        // uri: 'mongodb://127.0.0.1:27017/API_APP_BATALHA',
        uri: devEnv.DB_HOST,
    },
}