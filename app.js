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
const ExpressError = require('./utils/expressError');
const catchAsync = require('./utils/catchAsync');
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
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@hotsaucecluster.aupxg.mongodb.net/hotSauceCollection`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
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

app.get(
  '/sauces',
  catchAsync(async (req, res) => {
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
  })
);

app.get(
  '/sauces/resupply',
  catchAsync(async (req, res) => {
    const sauces = await Sauce.find({ isEmpty: true });
    console.log(sauces);
    res.render('sauces/resupply', { sauces });
  })
);

app.get('/sauces/new', (req, res) => {
  res.render('sauces/new');
});

app.post(
  '/sauces',
  upload.single('image'),
  catchAsync(async (req, res, next) => {
    const sauce = new Sauce(req.body);
    sauce.image = { url: req.file.path, filename: req.file.filename };
    await sauce.save();
    res.redirect('/sauces');
  })
);

app.get(
  '/sauces/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const sauce = await Sauce.findById(id);
    console.log(sauce);
    res.render('sauces/show', { sauce });
  })
);

app.get(
  '/sauces/:id/edit',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const sauce = await Sauce.findById(id);
    res.render('sauces/edit', { sauce });
  })
);

app.get(
  '/sauces/:id/resupply',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const sauce = await Sauce.findByIdAndUpdate(
      id,
      { $set: { isEmpty: true } },
      { new: true }
    );
    await sauce.save();
    res.redirect('/sauces/resupply');
  })
);

app.get(
  '/sauces/:id/toCollection',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const sauce = await Sauce.findByIdAndUpdate(
      id,
      { $set: { isEmpty: false } },
      { new: true }
    );
    await sauce.save();
    res.redirect('/sauces');
  })
);

app.put(
  '/sauces/:id',
  catchAsync(async (req, res) => {
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
  })
);

app.delete(
  '/sauces/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedSauce = await Sauce.findByIdAndDelete(id);
    res.redirect('/sauces');
  })
);

//ERROR if no URLs are matched!
app.all('*', (req, res, next) => {
  next(new ExpressError('Error man!', 404));
});

//Express Error Handeling
app.use((err, req, res, next) => {
  const { message = 'something went wrong...', statusCode = 500 } = err;
  res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
