const express = require('express');
const router = express.Router();
const User = require('../../models/schemas/UserSchema')

router.get('/:id', async (req, res) => {
    res.json(await User.findById(req.params.id));
})

module.exports = router