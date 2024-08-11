const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  pass: {
    type: String,
    required: true
  }
});

const Login = mongoose.model('Login', LoginSchema);

module.exports = Login;