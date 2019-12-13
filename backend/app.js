const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

mongoose.connect("mongodb://localhost/pet-finder", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dogsFoundRouter = require('./routes/adverts/found');
const dogsLostRouter = require('./routes/adverts/lost');
const RegistrationRouter = require('./routes/users/registration');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Установка заголовков запросов
app.use(require('./middleware/headers'));

app.use('/api/found', dogsFoundRouter);
app.use('/api/lost', dogsLostRouter);
app.use('/users', RegistrationRouter);


module.exports = app;