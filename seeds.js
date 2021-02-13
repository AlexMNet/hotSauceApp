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

// const sauceSeed = new Sauce({
//   name: 'Torchbearer | Garlic Reaper Sauce',
//   brand: 'Torchbearer',
//   price: 16.0,
//   description:
//     'The #7 spot is where things tip towards the dramatic, and for season 8 we brought in a doozie. The first ingredient is this hot sauce is Carolina Reaper, and the second ingredient is garlic. Need we say more? This sauce is unlike any other we’ve had on Hot Ones, with a rich oil base that gives it a creamy texture with just enough savory spices to round out that garlic. Try using it as a marinade for chicken or salmon, or add to a roast beef sandwich for an amazing lunchtime treat. Oh and be sure to have this bottle handy the next time you order a pizza...',
//   ingredients:
//     'Carolina Reaper pepper, garlic, canola oil, water, distilled white vinegar, lime juice, granulated garlic, mustard powder, chili powder, salt',
//   size: '5 oz',
//   imageUrl:
//     'https://cdn.shopify.com/s/files/1/2086/9287/products/7944157921378_1024x1024.jpg?v=1553814779',
// });

Sauce.insertMany([
  {
    name: 'Torchbearer | Garlic Reaper Sauce',
    brand: 'Torchbearer',
    bottles: 1,
    price: 16.0,
    rating: 5,
    heat: 'Hot',
    description:
      'The #7 spot is where things tip towards the dramatic, and for season 8 we brought in a doozie. The first ingredient is this hot sauce is Carolina Reaper, and the second ingredient is garlic. Need we say more? This sauce is unlike any other we’ve had on Hot Ones, with a rich oil base that gives it a creamy texture with just enough savory spices to round out that garlic. Try using it as a marinade for chicken or salmon, or add to a roast beef sandwich for an amazing lunchtime treat. Oh and be sure to have this bottle handy the next time you order a pizza...',
    ingredients:
      'Carolina Reaper pepper, garlic, canola oil, water, distilled white vinegar, lime juice, granulated garlic, mustard powder, chili powder, salt',
    size: '5 oz',
    isEmpty: false,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/2086/9287/products/7944157921378_1024x1024.jpg?v=1553814779',
  },
  {
    name: 'Bravado | Black Garlic Carolina Reaper',
    brand: 'Bravado',
    bottles: 1,
    price: 12.0,
    rating: 4,
    heat: 'Medium',
    description:
      "Team Bravado is back at it with an elevated offering where Carolina Reaper meets aged black garlic. The sweetness of the slowly cooked garlic tempers the initial bitter burn of the Reaper, but not for long... This is a biting hot sauce you'll want in marinades, sauces, dressings, and on those garlic wings!",
    ingredients:
      'Vinegar, red serrano, Carolina Reaper, roasted garlic, maple syrup, black garlic, black pepper, sea salt',
    size: '5 oz',
    isEmpty: false,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/2086/9287/products/3565542735988_1024x1024.jpg?v=1553815267',
  },
  {
    name: 'Secret Aardvark | Habanero Hot Sauce',
    brand: 'Secret Aardvark',
    bottles: 1,
    price: 8.0,
    rating: 5,
    heat: 'medium',
    description:
      "Portland's famous table sauce, Secret Aardvark Habanero's unique Caribbean / Tex-Mex hybrid is made with flavorful Habanero peppers and roasted tomatoes. You'll want to use it on everything, so be careful if you only get one bottle.",
    ingredients:
      'White wine vinegar, roasted tomatoes, habanero peppers, onion, carrot, sugar, prepared mustard, water, kosher salt, cornstarch, herbs & spices',
    size: '8 oz',
    isEmpty: false,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/2086/9287/products/460749635593_1024x1024.jpg?v=1553815786',
  },
  {
    name: 'Butterfly Bakery | Smoked Onion',
    brand: 'Butterfly Bakery',
    bottles: 1,
    price: 10.0,
    rating: 3,
    heat: 'medium',
    description:
      'The makers at Butterfly Bakery smoke Vermont onions with maplewood to mix with red jalapeños for this sweet and tangy sauce. Great on everything from bagels lox & cream cheese to hummus to pork and whatever else you can name. The medium heat level makes it the perfect smoky sauce for anyone!',
    ingredients:
      'Dog River Farm red jalapeños, organic white vinegar, maple wood smoked Full Moon Farm onions, salt',
    size: '5 oz',
    isEmpty: false,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/2086/9287/products/4866924937314_1024x1024.jpg?v=1553815597',
  },
  {
    name: "Dirty Dick's | Hot Pepper Sauce",
    brand: "Dirty Dick's",
    bottles: 1,
    price: 10.0,
    rating: 5,
    heat: 'Hot',
    description:
      'Dirty Dick’s Hot Sauce blends habanero peppers with tropical fruits for a sweet and spicy sauce. Let the sweetness of bananas, raisins, and pineapples linger on your palate and wait for the heat to kick in. Great for beef stir-fry, chicken wraps, and as a stand-alone dipping sauce for the daring.',
    ingredients:
      'Habanero peppers, mangoes, pineapple, vinegar, bananas, brown sugar, raisins, onions, garlic, salt, spices',
    size: '5 oz',
    isEmpty: false,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/2086/9287/products/368548413449_1024x1024.jpg?v=1553815345',
  },
  {
    name: 'Small Axe Peppers | Habanero Mango',
    brand: 'Small Axe Peppers',
    bottles: 1,
    price: 10.0,
    rating: 5,
    heat: 'Hot',
    description:
      "This hot sauce is sweet and simple - fruity habanero peppers sourced from community gardens around the country are paired with sweet mango and tangy tamarind. Blend it all together for a lovely chutney-like condiment that's great on any dinner plate! Also, try incorporating some into a dipping sauce for a zesty twist.",
    ingredients:
      'Apple cider vinegar, habanero peppers, sugar, garlic, onion, mango puree, blood oj puree, tamarind paste, salt',
    size: '5 oz',
    isEmpty: false,
    imageUrl:
      'https://cdn.shopify.com/s/files/1/2086/9287/products/4737730281570_1024x1024.jpg?v=1553815245',
  },
]).then(() => {
  mongoose.connection.close();
});
