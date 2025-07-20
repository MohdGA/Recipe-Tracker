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
  await User.create(req.body);

})


module.exports = router;