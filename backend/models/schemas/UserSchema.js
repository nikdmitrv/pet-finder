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
    name,
    email,
    phoneNumber,
    adress,
) {
    let AdvertGenerated = new Advert({
        dogData: new Animal(breed, description, sex),
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
