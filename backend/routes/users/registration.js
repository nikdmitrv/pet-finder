const express = require("express");
const router = express.Router();
const User = require("../../models/schemas/UserSchema");

router.post("/", async function(req, res) {
  const currentUser = await User.findOne({
    email: req.body.email
  });
  if (!currentUser) {
    req.session.logged = true;
    req.session.name = req.body.email;
    newUser = new User({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    }).save();
    const user = await User.findOne({
      email: newUser.email
    });
    res.json({ user });
  } else {
    res.status.json({ message: "Пользователь с таким email уже существует" });
  }
});

module.exports = router;
