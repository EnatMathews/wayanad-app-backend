const mongoose = require('mongoose');

const AddSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  phoneno: { type: String, required: true },
  village: { type: String, required: true },
  place: { type: String, required: true },
  pincode: { type: String, required: true },
  houseno: { type: String, required: true },
  missingdate: { type: Date, required: true },
  aadharno: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: String, required: true }
});

const Add = mongoose.model('Add', AddSchema);

module.exports = Add;