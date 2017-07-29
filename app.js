var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  path = require('path'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  passport = require('passport'),
  expressValidator = require('express-validator'),
  LocalStrategy = require('passport-local').Strategy,
  bodyParser = require('body-parser'),
  multer = require('multer'),
  cloudinary = require('cloudinary'),
  session = require('express-session');

//destino de videos subidos
var upload = multer({dest :'./videos'});

//conexión con Cloudinary
cloudinary.config({
	cloud_name: "lauramv21",
	api_key: "127686626259722",
	api_secret: "_LPx0JveMPU6ssLdjNyZuSWxSDg"
});

var app = express();

//autogenerado. Conexión con la base de datos
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

module.exports = require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});


app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

app.use(passport.initialize());
app.use(passport.session());


//from Github/clavant
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());


app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
