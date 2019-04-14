const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  email: String,
  password: String,
  role: Number
});

const model = mongoose.model('users', schema);

module.exports = model;
