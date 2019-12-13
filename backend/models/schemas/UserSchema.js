const mongoose = require("mongoose");
const Advert = require("../FoundDogAdvertModel");
const { ObjectId } = mongoose.Schema.Types;
const { Animal, Author } = require('../schemas/AdvertSchema')



const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    myAdverts: [{ type: ObjectId, ref: "Advert" }],

});

userSchema.methods.addAdvert = async function (
    breed,
    description,
    sex,
    date,
    name,
    email,
    phoneNumber,
    adress,
) {
    let AdvertGenerated = new Advert({
        dogData: new Animal(breed, description, sex, date),
        authorData: new Author(name,
            email,
            phoneNumber,
            adress)
    });
    this.myAdverts.push(AdvertGenerated);
    await AdvertGenerated.save();
    await this.save();
};

module.exports = mongoose.model('User', userSchema);
