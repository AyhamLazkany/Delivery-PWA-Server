const express = require('express');
const bodyParser = require('body-parser');
const BayRecs = require('../models/bayRec');
const cors = require('./cors');

const bayRecRouter = express.Router();
bayRecRouter.use(bodyParser.json());

/* GET BayRecs listing. */
bayRecRouter.route('/')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.cors, (req, res, next) => {
    BayRecs.findOne(req.query)
      .populate('orders.dishes')
      .then((BayRecs) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(BayRecs);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).post(cors.corsWithOptions, (req, res, next) => {
    BayRecs.create(req.body)
      .then((bayRec) => {
        bayRec.populate('dishes');
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(bayRec);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 404;
    res.end('Put operation is not supported on \'/BayRecs\'');
  }).delete(cors.corsWithOptions, (req, res, next) => {
    BayRecs.Many(req.query)
      .then((delResult) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(delResult);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = bayRecRouter;