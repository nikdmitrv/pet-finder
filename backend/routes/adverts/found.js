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

router.route('/:id').delete((req, res) => {
  FoundDogAdvertModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Dog deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  console.log(req.body);
  FoundDogAdvertModel.findById(req.params.id)
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
  FoundDogAdvertModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Dog deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
