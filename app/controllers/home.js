var express = require('express'),
  router = express.Router();
var config = require("../../config/config");

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function(req, res){
  res.render('index', {baseUrl: config.baseUrl});
});
