const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean
})

// static method
userSchema.statics.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.vidly_jwtPrivateKey);
  return token;
}

// instance method
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.vidly_jwtPrivateKey);
  return token;
}

const User = mongoose.model("User", userSchema);

module.exports = { userSchema, User };
