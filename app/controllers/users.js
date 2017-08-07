var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcryptjs'),
  File = mongoose.model('File'),
  cloudinary = require('cloudinary');
var config = require("../../config/config");


module.exports = function (app) {
  app.use('/', router);
};

/* Servicio Web: Entrada al formato de Registro de usuarios.
 Método: GET
 URI: /registro
 */

router.get('/registro', function(req, res){
  res.render("register", {baseUrl: config.baseUrl});
});

/* Servicio Web: Entrada al formato de Inicio de sesión.
 Método: GET
 URI: /ingresar
 */

router.get('/ingresar', function(req, res){
  res.render("login", {baseUrl: config.baseUrl});
});

/* Servicio Web: Inserta un Nuevo Usuario en la Base de datos
 Método: POST
 URI: /registrando
 */

router.post('/registrando', function(req, res){
  var name = req.body.name;
  var lastname = req.body.lastname;
  var username = req.body.username;
  var password = req.body.password;
  var confirmPassword = req.body.password2;
  console.log(name);
  console.log(lastname);
  console.log(username);
  console.log(password);
  console.log(confirmPassword);

  req.checkBody('name', 'Nombre es necesario').notEmpty();
  req.checkBody('lastname', 'Apellido es necesario').notEmpty();
  req.checkBody('username', 'Nombre de usuario es necesario').notEmpty();
  req.checkBody('password', 'Contraseña es necsario').notEmpty();
  req.checkBody('confirmPassword', 'Las contraseñas no coinciden').equals(req.body.password);

  var errors = req.validationErrors();

  if(errors){
    res.render('register',{errors:errors}, {baseUrl: config.baseUrl});
  }else{
    var nuevoUsuario = new User({
      name: name,
      lastname: lastname,
      username: username,
      password: password,
    });

    User.createUser(nuevoUsuario, function(req, res){
      //if(err) throw err;
    });

    req.flash('success_msg', 'Usted ha sido registrado');

    res.redirect('ingresar', {baseUrl: config.baseUrl});
  }
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Usuario desconocido'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Contraseña incorrecta'});
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

/* Servicio Web: Realiza la autenticación del usuario para ingresar.
 Método: POST
 URI: /ingresando
 */

router.post('/ingresando',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/2tvideos/ingresar',failureFlash: true}),
  function(req, res) {
    res.redirect('/videos', {baseUrl: config.baseUrl});
  });

/* Servicio Web: Finaliza la sesión actual y redirige al formato de Inicio de sesión.
 Método: GET
 URI: /salir
 */

router.get('/salir', ensureAuthenticated, function(req, res){
  req.logout();

  req.flash('success_msg', 'Desconectado exitosamente');

  res.redirect('/ingresar', {baseUrl: config.baseUrl});
});


/* Servicio Web: Busca y muestra los datos del usuario en la Base de datos.
 Método: GET
 URI: /cuenta
 */
router.get('/cuenta', ensureAuthenticated, function (req, res) {
  User.getUserByUsername(req.user.username, function(err, user) {
    res.render('account', {usuario:user}, {baseUrl: config.baseUrl});
  });
});

router.post('/cambiarClave', function(req, res) {
  var usuario = req.user.username;
  var clave = req.body.oldpassword;
  var nuevaClave = req.body.newpassword;
  var repetirClave = req.body.confirmPassword;

  if (nuevaClave == repetirClave) {
    var coinciden = true;
  }
  console.log(coinciden);

  User.findOne({"username": usuario}, function (err, user) {
    console.log(user.password);
    User.comparePassword(clave, req.user.password, function (err, isMatch) {
      if (isMatch) {
        console.log(isMatch);
        if (!coinciden) {
          req.flash('error_msg','las contraseñas nuevas no coinciden entre si');
          res.redirect('/cuenta', {baseUrl: config.baseUrl})
        }else{
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(nuevaClave, salt, function (err, hash) {
              var claveNueva = hash;
              console.log(claveNueva);

              var claveData = {
                password : claveNueva
              };
              User.update({"username": usuario}, claveData , function () {
                req.flash('success_msg', 'Contraseña cambiada exitosamente');
                res.redirect("/cuenta", {baseUrl: config.baseUrl})
              });
            });
          });
        }
      }else{
        req.flash('error_msg', 'La "contraseña anterior" ingresada es incorrecta');
        res.redirect('/cuenta', {baseUrl: config.baseUrl})
      }
    });
  });
});

/* Servicio Web: Modifica los datos del usuario en la Base de datos.
 Método: POST
 URI: /actualizarDatos
 */

router.post('/actualizarDatos', function (req, res) {
  var userData = {
    name: req.body.name,
    lastname: req.body.lastname
  };
  var userId = req.user._id;
  console.log(userId);
  User.update({"_id":userId}, userData, function () {
    res.redirect('/cuenta', {baseUrl: config.baseUrl});
  });
});

/* Servicio Web: Elimina el usuario y sus archivos de la Base de datos.
 Método: POST
 URI: /eliminarCuenta
 */


router.post('/eliminarCuenta', function (req, res) {
  var userId = req.user._id;
  var userName = req.user.username;
  User.remove({"_id":userId},function (err) {
    if (err){console.log(err);}
    File.remove({"username":userName},function (err) {
      if (err){console.log(err);}
    });
    res.redirect("/", {baseUrl: config.baseUrl})
  });

});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/ingresar', {baseUrl: config.baseUrl});
  }
}
