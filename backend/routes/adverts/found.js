const express = require('express');
const foundDog =require('../../models/schemas/AdvertSchema')
const router = express.Router();

router.get('/', async (req, res) => {
    foundDog.getAll()
    await res.json()
})

module.exports = router;