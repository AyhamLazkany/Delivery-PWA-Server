const express = require('express');
const bodyParser = require('body-parser');
const Cards = require('../models/card');
const authenticate = require('../authenticate');
const cors = require('./cors');

const cardRouter = express.Router();
cardRouter.use(bodyParser.json());

/* GET Cards listing. */
cardRouter.route('/')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Cards.findOne(req.query)
      .populate('orders.dishes')
      .then((Cards) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(Cards);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Cards.create(req.body)
      .then((card) => {
        card.populate('dishes');
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(card);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 404;
    res.end('Put operation is not supported on \'/Cards\'');
  }).delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Cards.Many(req.query)
      .then((delResult) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(delResult);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = cardRouter;