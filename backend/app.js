const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

mongoose.connect("mongodb://localhost/pet-finder", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dogsFoundRouter = require('./routes/adverts/found');
const dogsLostRouter = require('./routes/adverts/lost');
const accountRouter = require('./routes/account/account');
const RegistrationRouter = require('./routes/users/registration');
const LoginRouter = require('./routes/users/login');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Установка заголовков запросов
app.use(require('./middleware/headers'));

app.use('/api/found', dogsFoundRouter);
app.use('/api/lost', dogsLostRouter);
app.use('/api/account', accountRouter);
app.use('/users', RegistrationRouter);
app.use('/users', LoginRouter);


module.exports = app;