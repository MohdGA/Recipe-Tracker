const mongoose = require('mongoose');
const {cloudinaryStorage} = require ('multer-storage-cloudinary')
const Schema = mongoose.Schema;

const movieSchema = new mongoose.Schema({
  title:String,
  description: String,
  price: Number,
  image: {
    url: {
      type: String,
      required: true
    },
    cloudinary_id: {
      type: String,
      required: true
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
}, {timestamps: true});

module.exports = mongoose.model('movies',movieSchema);