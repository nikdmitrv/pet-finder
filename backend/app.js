const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const formidable = require('formidable');

mongoose.connect("mongodb://localhost/pet-finder", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dogsFoundRouter = require('./routes/adverts/found');
const dogsLostRouter = require('./routes/adverts/lost');
const accountRouter = require('./routes/account/account');
const RegistrationRouter = require('./routes/users/registration');
const LoginRouter = require('./routes/users/login');
const imageRouter = require('./routes/imagerouter/imagerouter')

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Установка заголовков запросов
app.use(require('./middleware/headers'));

app.use('/api/found', dogsFoundRouter);
app.use('/api/lost', dogsLostRouter);
app.use('/api/account', accountRouter);
app.use('/users/registration', RegistrationRouter);
app.use('/users/login', LoginRouter);
app.use('/api/images', imageRouter)


module.exports = app;