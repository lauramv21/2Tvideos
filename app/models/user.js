var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

//estructura registro de usuarios
var UserSchema = new Schema({
	name: String,
	last_name: String,
	username:String,
	password: String
});

var User = mongoose.model('User', UserSchema);

//Agregar nuevo usuario
module.exports.createUser = function(newUser, callback){
	//from byscrypjs
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}


//confimar contraseña
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
