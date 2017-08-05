var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'production';

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
    port: process.env.PORT || 3001,
    db: 'mongodb://localhost/2Tvideos_test'
  },

  production: {
    root: rootPath,
    app: {
      name: '2Tvideos'
    },
    port: process.env.PORT || 3001,
    db: 'mongodb://lauramv21:laura.21@ds135963.mlab.com:35963/2tvideos'
  }
};

module.exports = config[env];
