const mongoose = require('mongoose');

const sauceSchema = new mongoose.Schema({
  name: String,
  brand: String,
  bottles: Number,
  price: Number,
  rating: Number,
  heat: String,
  description: String,
  ingredients: String,
  size: String,
  isEmpty: {
    type: Boolean,
    default: false,
  },
  imageUrl: String,
});

module.exports = mongoose.model('Sauce', sauceSchema);
