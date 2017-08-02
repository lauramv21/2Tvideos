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
    username:req.user.username,
    title:req.body.title,
    description:req.body.description,
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


router.get("/videos", function(req, res){
  File.find({privateFile:"false"},function(err, documento){
    if(err){console.log(err);}
    res.render("display",{ videos : documento})
  });
});


router.get('/misvideos', function(req, res){
  File.find({username:req.user.username}, function(err, documento){
    if(err){console.log(err);}
    console.log(documento);
    res.render('profile', {videos:documento});
  });
});


router.get('/editar/:id', function(req, res) {
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
    privateFile : privado
  };
  console.log(videoData);
  File.update({"_id":req.params.id}, videoData, function(){
    res.redirect("/misvideos")
  });
});


router.post('/buscar', function(req, res) {
  File.find({username: req.body.buscar, privateFile: "false"}, function (err, documento) {
    if (err) {
      console.log(err);
    }
    res.render('display', {username: req.user.username, videos: documento});
  });
});
