var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/categories');



// services

var app = express();

// middleware


app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/booksDb',{})
.then(() => {
    console.log('mongoya bağlandı');
})
.catch(err => {
    console.error('hata', err);
})


app.use('/', indexRouter);
app.use('/api/categories', categoryRouter);

module.exports = app;
