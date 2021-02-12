const mongoose = require('mongoose');

const sauceSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  description: String,
  ingredients: String,
  size: String,
  imageUrl: String,
});

module.exports = mongoose.model('Sauce', sauceSchema);
