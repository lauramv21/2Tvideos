var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//estructura subir achivos
var FileSchema = new Schema({
	name:String,
  video:String,
	privateFile: Boolean
});

var File = mongoose.model('File', FileSchema);
