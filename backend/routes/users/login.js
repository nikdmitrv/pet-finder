const express = require("express");
const router = express.Router();
const User = require("../../models/schemas/UserSchema");

router.post("/", async function(req, res) {

  let emailInput = req.body.email;
  let passwordInput = req.body.password;
  const currentUser = await User.findOne({
    email: emailInput
  });

  if (currentUser !== null && passwordInput === currentUser.password) {
    req.session.logged = "true";
    req.session.name = req.body.email;
    res.json({ message: "пользователь найден", currentUser });
    // console.log(req.session.name);
  } else {
    req.session.destroy();
    res.json({ message: "Неверный email или пароль" });
    // console.log(req.session.name);
  }
});

module.exports = router;
