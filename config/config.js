var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: '2Tvideos'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://localhost/2Tvideos_Desarrollo'
  },

  test: {
    root: rootPath,
    app: {
      name: '2Tvideos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/2Tvideos_test'
  },

  production: {
    root: rootPath,
    app: {
      name: '2Tvideos'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/2Tvideos_Funcionamiento'
  }
};

module.exports = config[env];
