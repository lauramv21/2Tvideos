var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'test';

var config = {
  development: {
    baseUrl: "/2tvideos/",
    root: rootPath,
    app: {
      name: '2Tvideos'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://localhost/2Tvideos_Desarrollo'
  },

  test: {
    baseUrl: "/2tvideos/",
    root: rootPath,
    app: {
      name: '2Tvideos'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://localhost/2Tvideos_test'
  },

  production: {
    baseUrl: "/2tvideos/",
    root: rootPath,
    app: {
      name: '2Tvideos'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://lauramv21:laura.21@ds249575.mlab.com:49575/vos'
  }
};

module.exports = config[env];
