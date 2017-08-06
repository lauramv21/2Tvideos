var express = require('express'),
  config = require("./config/config"),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function(req, res){
  res.render('index', {baseUrl: config.baseUrl});
});
