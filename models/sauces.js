const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
  image: {
    url: String,
    filename: String,
  },
});

sauceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Sauce', sauceSchema);
