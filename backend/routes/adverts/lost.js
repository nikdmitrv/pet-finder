const express = require("express");

const LostDogAdvertModel = require("../../models/LostDogAdvertModel");
const { Animal, Author } = require("../../models/schemas/AdvertSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await LostDogAdvertModel.getAll());
});

router.post("/", async (req, res) => {
  console.log(req.body)
  const { dogData, authorData, location } = req.body;
  const newAdvert = new LostDogAdvertModel({
    dogData: new Animal(
      dogData.breed,
      dogData.description,
      dogData.sex,
      dogData.image
    ),
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

router.route('/update/:id').post((req, res) => {
  console.log(req.body);
  LostDogAdvertModel.findById(req.params.id)
    .then(dog => {
      dog.dogData.breed = req.body.breed;
      dog.dogData.description = req.body.description;
      dog.dogData.sex = req.body.sex;
      dog.dogData.date = req.body.date;
      // dog.location = req.body.location;

      dog.save()
        .then(() => res.json('Dog updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
  LostDogAdvertModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Dog deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
