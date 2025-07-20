require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('session');
const userController = require('./controllers/userController');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connection', () => {
  console.log("CONNECTED TO DATABSE")
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
// }))


app.get('/', (req,res) => {
  res.render('index.ejs')
});

app.use('/auth', userController);

app.listen(port , () => {
  console.log('connected to the server');
});

