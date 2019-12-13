const express = require("express");

const FoundDogAdvertModel = require("../../models/FoundDogAdvertModel");
const { Animal, Author } = require("../../models/schemas/AdvertSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await FoundDogAdvertModel.getAll());
});

router.post("/", async (req, res) => {
  const { dogData, authorData, location } = req.body;
  const newAdvert = new FoundDogAdvertModel({
    dogData: new Animal(dogData.breed, dogData.description, dogData.sex),
    authorData: new Author(
      authorData.name,
      authorData.email,
      authorData.phoneNumber,
      authorData.adress
    ),
    createdAt: Date.now(),
    location
  });
  newAdvert
    .save()
    .then(() => {
      res.json({ message: "Объявление добавлено", newAdvert });
    })
    .catch(err => {
      res.json({ message: err.message });
    });
});

router.get('/:id', async (req, res) => {
  const allFound = await FoundDogAdvertModel.getAll();
  const response = allFound.find(advert => advert.id === req.params.id);
  res.json(response)
})

module.exports = router;
