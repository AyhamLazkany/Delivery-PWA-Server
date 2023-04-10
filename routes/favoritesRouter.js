const express = require('express');
const bodyParser = require('body-parser');
const Favorites = require('../models/favorite');
const cors = require('./cors');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

/* GET Favorites listing. */
favoriteRouter.route('/')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.cors, (req, res, next) => {
    Favorites.findOne(req.query)
      .populate('dishes')
      .populate('restaurants')
      .then((Favorites) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(Favorites);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).post(cors.corsWithOptions, (req, res, next) => {
    Favorites.create(req.body)
      .then((favorite) => {
        favorite.populate('dishes').populate('restaurants');
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(favorite);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 404;
    res.end('Put operation is not supported on \'/Favorites\'');
  }).delete(cors.corsWithOptions, (req, res, next) => {
    Favorites.Many(req.query)
      .then((delResult) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(delResult);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = favoriteRouter;