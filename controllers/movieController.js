const express = require('express');
const router = express.Router();
const movie = require('../models/movie');
const upload = require('../config/multer');

router.get('/new', (req,res) => {
  res.render('movies/new.ejs');
});

router.post('/', upload.single('image'),async (req,res) => {
  try{
    req.body.user = req.session.user_id;
    req.body.image = {
      url:req.file.path,
      cloudinary_id: req.file.fieldname
    }
    await movie.create(req.body);
    res.redirect('/movies');
  }catch(error){
    console.log(error);
  }
  
});

router.get('/', async (req,res) => {
  const allMovies = await movie.find();
  res.render('movies/index.ejs',{allMovies})
})

router.get('/:movieId', async(req,res) => {
  const foundMovie = await movie.findById(req.params.movieId)
  res.render('movies/show.ejs',{foundMovie})
});

router.delete('/:moveId', async (req,res) => {
  await movie.findByIdAndDelete(req.params.moveId);
  res.redirect('/movies')
})

module.exports = router;