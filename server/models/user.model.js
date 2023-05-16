const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username is already in use"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already in use"]
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    }
  }, {timestamps: true});
  
// this should go after 
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

const User = mongoose.model('User', UserSchema);
 
module.exports = User;
