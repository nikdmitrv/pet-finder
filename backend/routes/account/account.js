const express = require('express');

router.get('/:id', async (req, res) => {
    res.json(await LostDogAdvertModel.findById(req.params.id));
})

module.exports = router