//==========================================================
//CONFIG
//==========================================================

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Sauce = require('./models/sauces');
const { storage } = require('./cloudinary');
const multer = require('multer');
const upload = multer({ storage });
const port = process.env.PORT || 3000;

app.engine('ejs', ejsMate);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.set('partials', path.join(__dirname, 'partials'));

//==========================================================
//DATABASE
//==========================================================

mongoose
  .connect('mongodb://localhost:27017/hotSauceCollection', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
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
  const bottleCount = await Sauce.find({ isEmpty: false });
  let numOfBottles = 0;

  bottleCount.forEach((bottle) => {
    numOfBottles += bottle.bottles;
  });

  const sauces = await Sauce.paginate(
    { isEmpty: false },
    {
      page: req.query.page || 1,
      limit: 8,
    }
  );

  res.render('sauces/home', { sauces, numOfBottles });
});

app.get('/sauces/resupply', async (req, res) => {
  const sauces = await Sauce.find({ isEmpty: true });
  console.log(sauces);
  res.render('sauces/resupply', { sauces });
});

app.get('/sauces/new', (req, res) => {
  res.render('sauces/new');
});

app.post('/sauces', upload.single('image'), async (req, res) => {
  const sauce = new Sauce(req.body);
  sauce.image = { url: req.file.path, filename: req.file.filename };
  await sauce.save();
  res.redirect('/sauces');
});

app.get('/sauces/:id', async (req, res) => {
  const { id } = req.params;
  const sauce = await Sauce.findById(id);
  console.log(sauce);
  res.render('sauces/show', { sauce });
});

app.get('/sauces/:id/edit', async (req, res) => {
  const { id } = req.params;
  const sauce = await Sauce.findById(id);
  res.render('sauces/edit', { sauce });
});

app.get('/sauces/:id/resupply', async (req, res) => {
  const { id } = req.params;
  const sauce = await Sauce.findByIdAndUpdate(
    id,
    { $set: { isEmpty: true } },
    { new: true }
  );
  await sauce.save();
  res.redirect('/sauces/resupply');
});

app.get('/sauces/:id/toCollection', async (req, res) => {
  const { id } = req.params;
  const sauce = await Sauce.findByIdAndUpdate(
    id,
    { $set: { isEmpty: false } },
    { new: true }
  );
  await sauce.save();
  res.redirect('/sauces');
});

app.put('/sauces/:id', async (req, res) => {
  const { id } = req.params;
  const sauce = await Sauce.findByIdAndUpdate(
    id,
    {
      ...req.body,
    },
    { new: true }
  );
  await sauce.save();
  res.redirect(`/sauces/${id}`);
});

app.delete('/sauces/:id', async (req, res) => {
  const { id } = req.params;
  const deletedSauce = await Sauce.findByIdAndDelete(id);
  res.redirect('/sauces');
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
