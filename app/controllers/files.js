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

router.get('/publicar', function(req, res){
  res.render('upload');
});

router.post("/publicando", upload.single('video'), function(req,res){
  var private = false;
  if(req.body.privateFile == 'on'){
    private = true;
  }

  var video = {
    username:req.body.username,
    video:req.body.video,
    privateFile:private
  }

  var archivo = new File(video);

  cloudinary.uploader.upload(req.file.path,
    function(result){
      archivo.video = result.url;
      archivo.save(function(err){
        console.log(archivo);
        res.render("login");
      });
    },
    { resource_type: "video"}
  );
});

router.get("/videos", function(solicitud, respuesta){
  File.find(function(err, documento){
    if(err){console.log(err);}
    respuesta.render("display",{ videos : documento})
  });
});


