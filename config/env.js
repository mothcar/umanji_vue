
var env = process.env.NODE_ENV || 'development'
//APP_ENV

var config = {
  development: require('./development.js'),
  production: require('./production.js')
  // staging: require('./staging.config')
}

module.exports = config[env]
