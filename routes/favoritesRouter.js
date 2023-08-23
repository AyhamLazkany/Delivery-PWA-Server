const express = require('express');
const bodyParser = require('body-parser');
const Favorites = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

/* GET Favorites listing. */
favoriteRouter.route('/')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    if (req.query.dish) {
      Favorites.findOne({ user: req.user._id })
        .then((favorite) => {
          if (favorite) var index = favorite.dishes.indexOf(req.query.dish);
          res.statusCode = 200;
          res.setHeader('Content-type', 'application/json');
          if (favorite && index !== -1) res.json({ exists: true });
          else res.json({ exists: false })
        }, (err) => next(err));
    } else if (req.query.restaurant) {
      Favorites.findOne({ user: req.user._id })
        .then((favorite) => {
          if (favorite) var index = favorite.restaurants.indexOf(req.query.restaurant);
          res.statusCode = 200;
          res.setHeader('Content-type', 'application/json');
          if (favorite && index !== -1) res.json({ exists: true });
          else res.json({ exists: false })
        }, (err) => next(err));
    } else {
      Favorites.findOne({ user: req.user._id })
        .populate('dishes')
        .populate('restaurants')
        .then((Favorites) => {
          if (Favorites) {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(Favorites);
          } else {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json({ dishes: [], restaurants: [] });
          }
        }, (err) => next(err))
        .catch((err) => next(err));
    }
  }).post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then((favs) => {
        if (favs) {
          if (req.body.restaurant) favs.restaurants.push(req.body.restaurant);
          if (req.body.dish) favs.dishes.push(req.body.dish);
          favs.save().then(() => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json({ success: true });
          }, (err) => next(err));
        } else {
          Favorites.create({ user: req.user._id })
            .then((favs) => {
              if (req.body.restaurant) favs.restaurants.push(req.body.restaurant);
              if (req.body.dish) favs.dishes.push(req.body.dish);
              favs.save().then(() => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json({ success: true });
              }, (err) => next(err));
            }, (err) => next(err))
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  }).put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 404;
    res.end('Put operation is not supported on \'/Favorites\'');
  }).delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then((favs) => {
        if (favs && req.query.dish && favs.dishes.indexOf(req.query.dish) !== -1) {
          let i = favs.dishes.indexOf(req.query.dish);
          favs.dishes.splice(i, 1);
          favs.save().then(() => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json({ success: true });
          }, (err) => next(err));
        } else if (favs && req.query.restaurant && favs.restaurants.indexOf(req.query.restaurant) !== -1) {
          let i = favs.restaurants.indexOf(req.query.restaurant);
          favs.restaurants.splice(i, 1);
          favs.save().then(() => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json({ success: true });
          }, (err) => next(err));
        } else {
          res.statusCode = 203;
          res.setHeader('Content-type', 'application/json');
          res.json({ success: false });
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = favoriteRouter;