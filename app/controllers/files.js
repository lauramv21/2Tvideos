var express = require('express'),
  router = express.Router(),
  multer = require('multer'),
  cloudinary = require('cloudinary'),
  mongoose = require('mongoose'),
  File = mongoose.model('File');
//destino de videos subidos
var upload = multer({dest :'./videos'});

//conexión con Cloudinary
cloudinary.config({
  cloud_name: "lauramv21",
  api_key: "127686626259722",
  api_secret: "_LPx0JveMPU6ssLdjNyZuSWxSDg"
});

module.exports = function (app) {
  app.use('/', router);
};

/* Servicio Web: Entrada al formato de subir un archivo.
 Método: GET
 URI: /publicar
 */

router.get('/publicar', ensureAuthenticated, function(req, res){
  res.render('upload');
});

/* Servicio Web: Almacena en la base de datos la referencia al video junto con sus atributos.
 Método: POST
 URI: /publicando
 */
router.post("/publicando", upload.single('video'), function(req,res){
  var private = false;
  if(req.body.privateFile == 'on'){
    private = true;
  }

  var video = {
    username:req.user.username,
    title:req.body.title,
    description:req.body.description,
    price:req.body.price,
    video:req.body.video,
    privateFile:private
  }

  var archivo = new File(video);

  cloudinary.uploader.upload(req.file.path,
    function(result){
      archivo.video = result.url;
      archivo.save(function(err){
        console.log(archivo);
        res.render("display");
      });
    },
    {resource_type: "video"}
  );
});

/* Servicio Web: Busca y muestra todos los videos en estado publico subidos por los usuarios
 en la Base de datos.
 Método: GET
 URI: /videos
 */

router.get("/videos",ensureAuthenticated,function(req, res){
  File.find({privateFile:"false"},function(err, documento){
    if(err){console.log(err);}
    res.render("display",{ videos : documento})
  });
});

/* Servicio Web: Despliega la lista de archivos subidos por el usuario en la sesión actual.
 Método: GET
 URI: /misvideos
 */

router.get('/misvideos', ensureAuthenticated, function(req, res){
  File.find({username:req.user.username}, function(err, documento){
    if(err){console.log(err);}
    console.log(documento);
    res.render('profile', {videos:documento});
  });
});

/* Servicio Web: Entrada al formato de actualización de los datos de la publicación.
 Método: GET
 URI: /editar/:id
 */

router.get('/editar/:id', ensureAuthenticated, function(req, res) {
  var id_video = req.params.id;
  File.findOne({"_id": id_video}, function (err, video) {
    res.render('edit', {video:video});
  });
});

router.post('/editar/:id', function(req, res){
  var privado = false;
  if(req.body.privateFile == 'on'){
    privado = true;
  }
  var videoData = {
    title: req.body.titulo,
    description: req.body.description,
    price: req.body.price,
    privateFile : privado
  };
  console.log(videoData);
  File.update({"_id":req.params.id}, videoData, function(){
    res.redirect("/misvideos")
  });
});

/* Servicio Web: Filtra los videos públicos por usuario y los muestra.
 Método: POST
 URI: /buscar
 */

router.post('/buscar', function(req, res) {
  File.find({username: req.body.buscar, privateFile: "false"}, function (err, documento) {
    if (err) {
      console.log(err);
    }
    res.render('display', {username: req.user.username, videos: documento});
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

/* Servicio Web: Elimina la publicación de la Base de datos.
 Método: POST
 URI: /delete/:id
 */
router.post('/delete/:id',function (req, res) {
  File.remove({"_id":req.params.id},function (err) {
    if (err){console.log(err);}
    res.redirect("/misvideos");
  });
});

