const express = require('express');
const router = express.Router();
const movie = require('../models/movie');
const upload = require('../config/multer');
const isSignedIn = require('../middleware/isSignedIn');

router.get('/new', isSignedIn ,(req,res) => {
  res.render('movies/new.ejs');
});

router.post('/', isSignedIn ,upload.single('image'),async (req,res) => {
  try{
    req.body.user = req.session.user._id;
    req.body.image = {
      url:req.file.path,
      cloudinary_id: req.file.fieldname
    }
    console.log(req.body)
    await movie.create(req.body);
    res.redirect('/movies');
  }catch(error){
    console.log(error);
  }
  
});

router.get('/', async (req,res) => {
  const allMovies = await movie.find();
  res.render('movies/index.ejs',{allMovies})
});



router.get('/:movieId', async(req,res) => {
  const foundMovie = await movie.findById(req.params.movieId).populate('user');
  
  res.render('movies/show.ejs',{foundMovie})

});

router.delete('/:movieId', async (req,res) => {
  console.log(req.params)
   await movie.findByIdAndDelete(req.params.movieId);
   res.redirect('/movies');
  
});

router.get('/:movieId/edit', async (req,res) => {
  const foundMovie = await movie.findById(req.params.movieId)
    res.render('movies/edit.ejs', {foundMovie});
  
  
});


router.put('/:movieId', async (req, res) => {
	await movie.findByIdAndUpdate(req.params.movieId, req.body)
	res.redirect(`/movies/${req.params.movieId}`)
})

module.exports = router;