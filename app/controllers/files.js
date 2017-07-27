var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');
  File = mongoose.model('File');

module.exports = function (app) {
  app.use('/', router);
};
