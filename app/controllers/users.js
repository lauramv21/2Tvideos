var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/registro', function(req, res){
  res.render("register");
});

router.get('/ingresar', function(req, res){
  res.render("login");
});
