var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcryptjs'),
  File = mongoose.model('File'),
  cloudinary = require('cloudinary');


module.exports = function (app) {
  app.use('/', router);
};

/* Servicio Web: Entrada al formato de Registro de usuarios.
 Método: GET
 URI: /registro
 */

router.get('/registro', function(req, res){
  res.render("register");
});

/* Servicio Web: Entrada al formato de Inicio de sesión.
 Método: GET
 URI: /ingresar
 */

router.get('/ingresar', function(req, res){
  res.render("login");
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
  var email = req.body.email;
  var phone = req.body.phone;
  var city = req.body.city;
  var country = req.body.country;

  req.checkBody('name', 'Nombre es necesario').notEmpty();
  req.checkBody('lastname', 'Apellido es necesario').notEmpty();
  req.checkBody('username', 'Nombre de usuario es necesario').notEmpty();
  req.checkBody('password', 'Contraseña es necesario').notEmpty();
  req.checkBody('email', 'Correo electronico es necesario').notEmpty();
  req.checkBody('phone', 'Celular es necesario').notEmpty();
  req.checkBody('city', 'Ciudad es necesario').notEmpty();
  req.checkBody('country', 'Pais es necesario').notEmpty();
  req.checkBody('confirmPassword', 'Las contraseñas no coinciden').equals(req.body.password);



  var errors = req.validationErrors();

  if(errors){
    res.render('register',{errors:errors});
  }else{
    var nuevoUsuario = new User({
      name: name,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
      phone: phone,
      city: city,
      country: country,
      rating: 5.0,
      voters: 1
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

/* Servicio Web: Realiza la autenticación del usuario para ingresar.
 Método: POST
 URI: /ingresando
 */

router.post('/ingresando',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/ingresar',failureFlash: true}),
  function(req, res) {
    res.redirect('/videos');
  });

/* Servicio Web: Finaliza la sesión actual y redirige al formato de Inicio de sesión.
 Método: GET
 URI: /salir
 */

router.get('/salir', ensureAuthenticated, function(req, res){
  req.logout();

  req.flash('success_msg', 'Desconectado exitosamente');

  res.redirect('/ingresar');
});


/* Servicio Web: Busca y muestra los datos del usuario en la Base de datos.
 Método: GET
 URI: /cuenta
 */
router.get('/cuenta', ensureAuthenticated, function (req, res) {
  User.getUserByUsername(req.user.username, function(err, user) {
    res.render('account', {usuario:user});
  });
});

router.get('/perfil/:username', ensureAuthenticated, function(req, res) {
  var username = req.params.username;
  console.log("USERNAME:" + username);
  User.findOne({"username": username}, function (err, user) {
    File.find({username: req.params.username, privateFile: "false"}).count(function (err, cantidad) {
      File.find({username: req.params.username, privateFile: "false"}, function (err, documento) {
        if (err) {
          console.log(err);
        }
        res.render('contact', {usuario: user, videos: documento, nVideos: cantidad});
      });
    });
  });
});

router.post('/rate/:username', function (req, res) {
  var newVote = parseInt(req.body.rating);
  console.log("STARS:" + newVote);
  //Operacion rating
  var viejoR = 0;
  var viejoV = 0;
  User.findOne({"username": req.params.username}, function (err, user) {
    viejoR = parseFloat(user.rating);
    viejoV = parseInt(user.voters);
    console.log("VIEJO RATE: " + viejoR);
    console.log("VIEJO VOTERS: " + viejoV);
    var defVoters = viejoV +1;
    var defRating = (((viejoR*viejoV)+(newVote))/defVoters).toFixed(2);
    //Actualizar Rating
    console.log("NUEVO RATE: " + defRating);
    console.log("NUEVO VOTERS: " + defVoters);

    var userData = {
      name: user.name,
      lastname: user.lastname,
      username:user.username,
      password: user.password,
      email: user.email,
      phone: user.phone,
      city: user.city,
      country: user.country,
      rating: defRating,
      voters: defVoters
    };

    User.update({"username":req.params.username}, userData, function(){
      res.redirect('/perfil/'+req.params.username);
    });

  });

});

router.post('/cambiarClave', function(req, res) {
  var usuario = req.user.username;
  var clave = req.body.oldpassword;
  var nuevaClave = req.body.newpassword;
  var repetirClave = req.body.confirmPassword;

  if (nuevaClave === repetirClave) {
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
          res.redirect('/cuenta')
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
                res.redirect("/cuenta")
              });
            });
          });
        }
      }else{
        req.flash('error_msg', 'La "contraseña anterior" ingresada es incorrecta');
        res.redirect('/cuenta')
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
    res.redirect('/cuenta');
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
    res.redirect("/")
  });

});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/ingresar');
  }
}
