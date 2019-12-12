const mongoose = require("mongoose");
const User = require('../schemas/UserSchema');

mongoose.connect("mongodb://localhost/pet-finder", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
async function seedall() {
  let u1 = new User({
    name: "l1",
    password: "p1",
    email: "c1",
    myAdverts: [],
  });
  await u1.save();

  let u2 = new User({
    name: "l2",
    password: "p2",
    email: "c2",
    myAdverts: [],
  });
  await u2.save();



  let DogOne = await User.findOne({ name: "l1" });
  await DogOne.addAdvert(
    "Запись1",
    "Запись1",
    "Запись1",
    "Запись1",
    "Запись1",
    "Запись1",
    "Запись1",
    
  );

  let DogTwo = await User.findOne({ name: "l2" });
  await DogOne.addAdvert(
    "Запись2",
    "Запись2",
    "Запись2",
    "Запись2",
    "Запись2",
    "Запись2",
    "Запись2",
    
  );
  //   mongoose.disconnect();
}
seedall();