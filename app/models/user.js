// file: ./models/user.js
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
})

// on save hook, encrypt password
userSchema.pre('save', function (next) {

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) { return next(err); }

      this.password = hash;
      next();
    });
  });
}); // end pre-save hook

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}; // end function comparePassword

// create the model class
const ModelClass = mongoose.model('user', userSchema);

// export the model
module.exports = ModelClass;
