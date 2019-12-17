const express = require("express");
const router = express.Router();

router.get("/", async function(req, res) {
  console.log(req.session);
  console.log(req.cookies);
  if (req.session && req.session.logged) {
    res.json({ message: "OK" });
  } else {
    console.log("session expired");

    res.clearCookie("sniffer");
    res.status(400).send("session expired");
  }
});

module.exports = router;
