const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SignUpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mob: { type: String, required: true },
  addd: { type: String, required: true },
  pin: { type: String, required: true },
  dir: { type: String, required: true },
  place: { type: String, required: true },
  emaill: { type: String, required: true },
  user: { type: String, required: true, unique: true },
  pass: { type: String, required: true }
});

// Pre-save hook to hash the password
SignUpSchema.pre('save', async function(next) {
  if (this.isModified('pass')) {
    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt);
  }
  next();
});

const SignUp = mongoose.model('SignUp', SignUpSchema);

module.exports = SignUp;