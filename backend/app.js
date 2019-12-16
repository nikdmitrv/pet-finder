const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');


const session = require('express-session')
const redis=require('redis')
const RedisStore=require('connect-redis')(session)
const client = redis.createClient()

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

app.use(session({store: 
    new RedisStore({
      client,
      host: 'localhost',
      port: 3000,
      ttl:260,
    }),
    key: 'user_sid',
    secret: 'oh klahoma',
    resave: false,
    saveUninitalized: false,
    cookie: {
      expires: 6000000,
    }
  }))

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


module.exports = app;