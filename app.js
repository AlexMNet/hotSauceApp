//==========================================================
//CONFIG
//==========================================================

const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Sauce = require('./models/sauces');
const port = process.env.PORT || 3000;

app.engine('ejs', ejsMate);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('partials', path.join(__dirname, 'partials'));

//==========================================================
//DATABASE
//==========================================================

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

//==========================================================
//ROUTES
//==========================================================

app.get('/sauces', async (req, res) => {
  const sauces = await Sauce.find({});
  res.render('sauces/home', { sauces });
});

app.get('/sauces/new', (req, res) => {
  res.render('sauces/new');
});

app.post('/sauces', (req, res) => {
  const { name, myfile } = req.body;
  sauces.push({ name, myfile });
  res.redirect('/sauces');
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
