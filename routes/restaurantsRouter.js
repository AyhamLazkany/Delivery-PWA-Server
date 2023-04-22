const express = require('express');
const bodyParser = require('body-parser');
const Restaurants = require('../models/restaurant');
const Dishes = require('../models/dish');
const authenticate = require('../authenticate');
const cors = require('./cors');

const restaurantRouter = express.Router();
restaurantRouter.use(bodyParser.json());

/* GET Restaurants listing. */
restaurantRouter.route('/')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.cors, (req, res, next) => {
    Restaurants.find(req.query)
      .then((Restaurants) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(Restaurants);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Restaurants.create(req.body)
      .then((restaurant) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(restaurant);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 404;
    res.end('Put operation is not supported on \'/Restaurants\'');
  });
/* .delete(cors.corsWithOptions, (req, res, next) => {
  Restaurants.deleteMany(req.query)
    .then((delResult) => {
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(delResult);
    }, (err) => next(err))
    .catch((err) => next(err));
}) */

restaurantRouter.route('/:restaurantId')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.cors, (req, res, next) => {
    Restaurants.findById(req.params.restaurantId)
      .then((restaurant) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(restaurant);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 404;
    res.end('Post operation is not supported on \'/Restaurants/' + req.params.restaurantId + '\'');
  }).put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Restaurants.findByIdAndUpdate(req.params.restaurantId, { $set: req.body }, { new: true })
      .then((restaurant) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(restaurant);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Restaurants.findByIdAndRemove(req.params.restaurantId)
      .then((restaurant) => {
        Dishes.deleteMany({ resId: restaurant._id })
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(restaurant);
      }, (err) => next(err))
      .catch((err) => next(err));
  });


module.exports = restaurantRouter;