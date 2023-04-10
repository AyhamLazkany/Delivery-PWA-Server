const express = require('express');
const bodyParser = require('body-parser');
const Dishes = require('../models/dish');
const cors = require('./cors');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

/* GET Dishes listing. */
dishRouter.route('/')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.cors, (req, res, next) => {
    Dishes.find(req.query)
      .then((Dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(Dishes);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).post(cors.corsWithOptions, (req, res, next) => {
    Dishes.create(req.body)
      .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(dish);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 404;
    res.end('Put operation is not supported on \'/Dishes\'');
  }).delete(cors.corsWithOptions, (req, res, next) => {
    Dishes.deleteMany(req.query)
      .then((delResult) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(delResult);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

dishRouter.route('/:dishId')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.cors, (req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(dish);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 404;
    res.end('Post operation is not supported on \'/Dishes/' + req.params.dishId + '\'');
  }).put(cors.corsWithOptions, (req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, { $set: req.body }, { new: true })
      .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(dish);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).delete(cors.corsWithOptions, (req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
      .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(dish);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = dishRouter;