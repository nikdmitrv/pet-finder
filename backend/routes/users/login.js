const express = require("express");
const router = express.Router();
const User = require('../../models/schemas/UserSchema');

router.post('/login', async function (req, res) {
    let emailInput = req.body.email;
    let passwordInput = req.body.password;
    const currentUser=await User.findOne({
        email: emailInput
    })
     
    if (currentUser !== null && passwordInput === currentUser.password) {
        
            //   req.session.logged = "true";
            //   req.session.email = req.body.email;
            res.json({ message: "пользователь найден", currentUser });
        
    } 
  else {
    // req.session.destroy();
      res.json({ message: "пользователь не существует"}) 
  }});
  
  module.exports = router;



