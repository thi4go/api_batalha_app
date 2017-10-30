
'use strict'

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
        // uri: 'mongodb://127.0.0.1:27017/api_batalha_app',
        uri: devEnv.DB_HOST,
    },
}
