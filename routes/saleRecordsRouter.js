const express = require('express');
const bodyParser = require('body-parser');
const SaleRecs = require('../models/saleRecord');
const authenticate = require('../authenticate');
const cors = require('./cors');

const saleRecRouter = express.Router();
saleRecRouter.use(bodyParser.json());

/* GET SaleRecs listing. */
saleRecRouter.route('/')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    SaleRecs.find(req.query)
      .then((SaleRecs) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        if (SaleRecs.length > 0) res.json(SaleRecs);
        else res.json([]);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    SaleRecs.create({
      userId: req.user._id, username: req.user.username,
      orders: req.body.orders, total: req.body.total, date: req.body.date
    }).then((saleRec) => {
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(saleRec);
    }, (err) => next(err))
      .catch((err) => next(err));
  }).put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 404;
    res.end('Put operation is not supported on \'/SaleRecs\'');
  }).delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    SaleRecs.deleteMany(req.query)
      .then((delResult) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(delResult);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

saleRecRouter.route('/editstatus/:id')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    SaleRecs.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      .then((saleRec) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(saleRec);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = saleRecRouter;