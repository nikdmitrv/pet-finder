const mongoose = require('mongoose');

// const advertSchemaConstructor = function () {
//     return mongoose.Schema({
//         dogData: Object,
//         authorData: Object,
//     })
// }

const AdvertSchema = mongoose.Schema({
    dogData: {
        breed: String,
        description: String,
        sex: String,
    },
    authorData: {
        name: String,
        email: String,
        phoneNumber: String,
        address: String,
    },
    createdAt: Date,
});


module.exports = AdvertSchema;