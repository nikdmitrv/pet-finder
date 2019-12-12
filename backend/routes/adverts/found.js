const express = require('express');

const FoundDogAdvertModel = require('../../models/FoundDogAdvertModel')
const { Animal, Author } = require('../../models/schemas/AdvertSchema')
const router = express.Router();

router.get('/', async (req, res) => {
    res.json(await FoundDogAdvertModel.getAll());
})

router.post('/', async (req, res) => {
    const { dogData, authorData } = req.body
    const newAdvert = new FoundDogAdvertModel(
        {
            dogData: new Animal(
                dogData.breed,git,
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
            res.json({ status: false, message: err })
        })
})

module.exports = router;
