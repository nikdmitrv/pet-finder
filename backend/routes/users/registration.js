const express = require('express');
const router = express.Router();
const User = require('../../models/schemas/UserSchema');




router.post('/registration', async function (req, res) {
  const currentUser=await User.findOne({
    email: req.body.email
  })
   
    if (!currentUser){
    // req.session.logged = "true";
    //   req.session.name = req.body.email;
    newUser = new User({ name: req.body.name, password: req.body.password, email: req.body.email }).save();
    res.json({ message: "пользователь создан", newUser });
    // нужно ли отправлять объект юзера на фронт??
    }
else {
    res.json({ message: "пользователь с таким email уже существует" }) 
}});

module.exports = router;