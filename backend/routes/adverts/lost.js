const express = require('express');
let LostDog = require('../../models/schemas/AdvertSchema');

const router = express.Router();

router.get('/', async (req, res) => {
    LostDog.getAll()
   await res.json()
})

module.exports = router;