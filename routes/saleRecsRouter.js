const express = require('express');
const bodyParser = require('body-parser');
const SaleRecs = require('../models/saleRec');
const cors = require('./cors');

const saleRecRouter = express.Router();
saleRecRouter.use(bodyParser.json());

/* GET SaleRecs listing. */
saleRecRouter.route('/')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.cors, (req, res, next) => {
    SaleRecs.findOne(req.query)
      .populate('orders.dishes')
      .then((SaleRecs) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(SaleRecs);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).post(cors.corsWithOptions, (req, res, next) => {
    SaleRecs.create(req.body)
      .then((saleRec) => {
        saleRec.populate('dishes');
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(saleRec);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 404;
    res.end('Put operation is not supported on \'/SaleRecs\'');
  }).delete(cors.corsWithOptions, (req, res, next) => {
    SaleRecs.Many(req.query)
      .then((delResult) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(delResult);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = saleRecRouter;