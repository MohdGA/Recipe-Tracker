require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const session = require('express-session');
const userController = require('./controllers/userController');
const movieController = require('./controllers/movieController');
const isSignedIn = require('./middleware/isSignedIn');
const passUserToViews = require('./middleware/pass-user');
const morgan = require('morgan');
const movie = require('./models/movie');


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connection', () => {
  console.log("CONNECTED TO DATABSE")
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized:true,
  store: mongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
  })
}))

app.use(passUserToViews);

app.get('/', async(req,res) => {
  const movies = await movie.find();
  res.render('index.ejs', {movies})
});

app.use('/auth', userController);
app.use('/movies', movieController);

app.get('/vip-lounge', isSignedIn,(req,res) => {
  return res.send(`WELCOME TO THE VIP LOUNGE ${req.session.user.username}`)
})



app.listen(process.env.PORT || 3000, () => {
  console.log('connected to the server');
});

