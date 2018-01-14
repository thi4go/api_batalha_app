var chai = require('chai'),
  chaiHttp = require('chai-http')

chai.should();
chai.use(chaiHttp);

require('./RoundTests.js')
require('./UserTests.js')
require('./BattleTests.js')


