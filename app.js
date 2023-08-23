var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var dishRouter = require('./routes/dishesRouter');
var restaurantRouter = require('./routes/restaurantsRouter');
var categoriesRouter = require('./routes/categoriesRouter')
var cartRouter = require('./routes/cartsRouter');
var favoriteRouter = require('./routes/favoritesRouter');
var bayRecordsRouter = require('./routes/bayRecordsRouter');
var saleRecordsRouter = require('./routes/saleRecordsRouter');
var initialOrderRouter = require('./routes/initialOrderRouter');
var uploadRouter = require('./routes/uploadsRouter');
var imagesRouter = require('./routes/imagesRouter');
var basicInfoRouter = require('./routes/basicInfoRouter')

const config = require('./config')
const mongoose = require('mongoose');
const connect = mongoose.connect(config.mongoUrl);

connect.then((db) => {
  console.log('Connected successfuly to server');
},(err) => { console.log(err); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/images', imagesRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/restaurants', restaurantRouter);
app.use('/categories', categoriesRouter);
app.use('/carts', cartRouter);
app.use('/favorites', favoriteRouter);
app.use('/bayRecords', bayRecordsRouter);
app.use('/saleRecords', saleRecordsRouter);
app.use('/initialOrder', initialOrderRouter);
app.use('/uploads', uploadRouter);
app.use('/basicInfo', basicInfoRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
