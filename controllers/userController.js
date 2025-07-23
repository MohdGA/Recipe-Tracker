const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/sign-up', (req,res) => {
  res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req,res) => {
  const userInDataBase = await User.findOne({username: req.body.username});

  if(userInDataBase){
    return res.send('USERNAME EXISTS!');
  };

  if(req.body.password !== req.body.confirmPassword){
    return res.send('PASSWORD MUST MATCH!')
  };

  const hashedPassword = bcrypt.hashSync(req.body.password,10);
  req.body.password = hashedPassword;
  const newUser = await User.create(req.body);

  req.session.user = {
    username: newUser.username,
    _id: newUser._id
  };
  req.session.save(() => {
    res.redirect('/')
  })
  

});

router.get('/sign-in', (req,res) => {
  res.render('auth/sign-in.ejs'); 
});

router.post('/sign-in', async (req,res) => {
  const userInDataBase = await User.findOne({username: req.body.username});

  if(!userInDataBase){
    return res.send('USERNAME IS NOT EXISTS!')
  };

  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDataBase.password
  );

  if(!validPassword){
    return res.send("WRONG PASSWORD!")
  };
  
  req.session.user = {
    username: userInDataBase.username,
    _id: userInDataBase._id
  };

  req.session.save(() => {
    res.redirect('/');
  })
  
});

router.get('/sign-out', (req,res) => {
  req.session.destroy(() => {
    res.redirect('/')
  });
  
})


module.exports = router;