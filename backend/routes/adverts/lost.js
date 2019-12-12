const express = require('express');

const LostDogAdvertModel = require('../../models/LostDogAdvertModel')
const { Animal, Author } = require('../../models/schemas/AdvertSchema')
const router = express.Router();

router.get('/', async (req, res) => {
    res.json(await LostDogAdvertModel.getAll());
})

router.post('/', async (req, res) => {
    
    const { dogData, authorData } = req.body
    const newAdvert = new LostDogAdvertModel(
        {
            dogData: new Animal(
                dogData.breed,
                dogData.description,
                dogData.sex
            ),
            authorData: new Author(
                authorData.name,
                authorData.email,
                authorData.phoneNumber,
                authorData.adress
            ),
            createdAt: Date.now()
        })
    newAdvert.save()
        .then(() => {
            res.json({ status: true, message: 'Saved!', newAdvert });
        })
        .catch((err) => {
            res.json({ statis: false, message: err })
        })
})

module.exports = router;