const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

mongoose.connect("mongodb://localhost/pet-finder", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const dogsAPIRouter = require('./routes/dogsAPI');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Установка заголовков запросов
app.use(require('./middleware/headers'));

app.use('/api', dogsAPIRouter);


module.exports = app;