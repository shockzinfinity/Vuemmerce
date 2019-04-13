const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  age: Number
});

const model = mongoose.model('user', schema);

module.exports = model;
