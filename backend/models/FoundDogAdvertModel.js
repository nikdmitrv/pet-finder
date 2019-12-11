const mongoose = require('mongoose');
const schema = require('./schemas/AdvertSchema');

module.exports = mongoose.model('FoundDogAdvert', schema);