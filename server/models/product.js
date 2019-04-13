import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
  title: String,
  description: String,
  price: Number,
  quantity: Number
});

const model = mongoose.model('products', schema);

export default model;
