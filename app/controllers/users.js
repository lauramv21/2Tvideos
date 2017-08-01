var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
  app.use('/', router);
};

router.get('/registro', function(req, res){
  res.render("register");
});

router.get('/ingresar', function(req, res){
  res.render("login");
});

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
    res.render('register',{
      errors:errors
    });
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

    res.redirect('ingresar');
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

router.post('/ingresando',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/ingresar',failureFlash: true}),
  function(req, res) {
    res.redirect('/videos');
  });

router.get('/logout', function(req, res){
  req.logout();

  req.flash('success_msg', 'Desconectado exitosamente');

  res.redirect('/ingresar');
});

/*
//Configuracion de cuenta
router.get('/account', function (req, res) {
  res.render('account');
});

*/

