var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

//estructura registro de usuarios
var UserSchema = new Schema({
	name: String,
	lastname: String,
	username:String,
	password: String,
  email: String,
  phone: String,
  city: String,
  country: String,
  rating: String,
  voters: String
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByUsername = function(username, callback){
  var query = {username: username};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err;
    callback(null, isMatch);
  });
}
