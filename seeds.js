const mongoose = require('mongoose');
const Sauce = require('./models/sauces');

mongoose
  .connect('mongodb://localhost:27017/hotSauceCollection', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MONGO CONNECTION OPEN!!!');
  })
  .catch((err) => {
    console.log('MONGO CONNECTION ERROR!!!!');
    console.log(err);
  });

const sauceSeed = new Sauce({
  name: 'Secret Aardvark | Habanero Hot Sauce',
  brand: 'Secret Ardvark',
  price: 10.0,
  description:
    "Portland's famous table sauce, Secret Aardvark Habanero's unique Caribbean / Tex-Mex hybrid is made with flavorful Habanero peppers and roasted tomatoes. You'll want to use it on everything, so be careful if you only get one bottle.",
  ingredients:
    'White wine vinegar, roasted tomatoes, habanero peppers, onion, carrot, sugar, prepared mustard, water, kosher salt, cornstarch, herbs & spices',
  size: '8 oz',
  imageUrl:
    'https://cdn.shopify.com/s/files/1/2086/9287/products/460749635593_1024x1024.jpg?v=1553815786',
});

sauceSeed.save().then(() => {
  mongoose.connection.close();
});
