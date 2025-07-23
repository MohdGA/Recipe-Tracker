const mongoose = require('mongoose');
const { use } = require('../controllers/userController');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true});


const User = mongoose.model('User', userSchema);

module.exports = User;