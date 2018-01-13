
'use strict'

/**
 * Module Dependencies
 */
const config         = require('./config'),
      restify        = require('restify'),
      bunyan         = require('bunyan'),
      winston        = require('winston'),
      bunyanWinston  = require('bunyan-winston-adapter'),
      mongoose       = require('mongoose'),
      corsMiddleware = require('restify-cors-middleware'),
      jwt            = require('restify-jwt')
/**
 * Logging
 */
global.log = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      timestamp: () => {
        return new Date().toString()
      },
      json: true
    }),
  ]
})

/**
 * Initialize Server
 */
global.server = restify.createServer({
  url     : config.base_url,
  name    : config.name,
  version : config.version,
  log     : bunyanWinston.createAdapter(log),
})

/**
 * Middleware
 */
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['Access-Control-Allow-Origin'],
  exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.jsonBodyParser({ mapParams: true }))
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser({ mapParams: true }))
server.use(restify.plugins.fullResponse())

// var jwtConfig = {
//     secret: config.jwt_secret
// }
//
// server.use(jwt(jwtConfig))

/**
 * Error Handling
 */
server.on('uncaughtException', (req, res, route, err) => {
  log.error(err.stack)
  res.send(err)
});

/**
 * Lift Server, Connect to DB & Bind Routes
 */
server.listen(config.port, function() {

  mongoose.connection.on('error', function(err) {
    log.error('Mongoose default connection error: ' + err)
    process.exit(1)
  })

  mongoose.connection.on('open', function(err) {

    if (err) {
      log.error('Mongoose default connection error: ' + err)
      process.exit(1)
    }

    log.info(
      '%s v%s ready to accept connections on port %s in %s environment. %s',
      server.name,
      config.version,
      config.port,
      config.env,
      server.url
    )


  })

  global.db = mongoose.connect(config.db.uri)

})

require('./api/routes/')

module.exports = server
