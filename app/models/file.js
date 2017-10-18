var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//estructura subir achivos
var FileSchema = new Schema({
  username:String,
	title:String,
  description:String,
  price:String,
  video:String,
	privateFile: String
});

var File = mongoose.model('File', FileSchema);
