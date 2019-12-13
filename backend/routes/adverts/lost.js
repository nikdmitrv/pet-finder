const express = require("express");

const LostDogAdvertModel = require("../../models/LostDogAdvertModel");
const { Animal, Author } = require("../../models/schemas/AdvertSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await LostDogAdvertModel.getAll());
});

router.post("/", async (req, res) => {
  const { dogData, authorData, location } = req.body;
  const newAdvert = new LostDogAdvertModel({
    dogData: new Animal(dogData.breed, dogData.description, dogData.sex, dogData.date),
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
  const allFound = await LostDogAdvertModel.getAll();
  const response = allFound.find(advert => advert.id === req.params.id);
  res.json(response)
})

module.exports = router;
