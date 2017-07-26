var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: '2tvideos'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://localhost/2tvideos-development'
  },

  test: {
    root: rootPath,
    app: {
      name: '2tvideos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/2tvideos-test'
  },

  production: {
    root: rootPath,
    app: {
      name: '2tvideos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/2tvideos-production'
  }
};

module.exports = config[env];
