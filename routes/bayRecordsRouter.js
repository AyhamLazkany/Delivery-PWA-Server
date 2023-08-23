const express = require('express');
const bodyParser = require('body-parser');
const BayRecords = require('../models/bayRecord');
const authenticate = require('../authenticate');
const cors = require('./cors');

const bayRecordRouter = express.Router();
bayRecordRouter.use(bodyParser.json());

/* GET BayRecords listing. */
bayRecordRouter.route('/')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    BayRecords.findOne({user: req.user._id})
      .then((BayRecords) => {
        if (BayRecords) {
          res.statusCode = 200;
          res.setHeader('Content-type', 'application/json');
          res.json(BayRecords.carts);
        } else {
          res.statusCode = 200;
          res.setHeader('Content-type', 'application/json');
          res.json([]);
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  }).post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    BayRecords.findOne({ user: req.user._id })
      .then((bayRecord) => {
        if (!bayRecord) {
          BayRecords.create({ user: req.user._id, carts: [req.body] })
            .then((bayRecord) => {
              res.statusCode = 200;
              res.setHeader('Content-type', 'application/json');
              res.json(bayRecord.carts[bayRecord.carts.lenght -1]);
            }, (err) => next(err));
        } else {
          bayRecord.carts.push(req.body);
          bayRecord.save().then((BayRecords) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(BayRecords.carts[BayRecords.carts.lenght -1]);
          }, (err) => next(err));
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  }).put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 404;
    res.end('Put operation is not supported on \'/BayRecords\'');
  }).delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    BayRecords.deleteMany(req.query)
      .then((delResult) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(delResult);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

bayRecordRouter.route('/:id')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    BayRecords.findOne({user: req.body.userId})
      .then((bayRecord) => {
        if (bayRecord) {
          let index = bayRecord.carts.findIndex(cart => cart.id == req.params.id);
          bayRecord.carts[index].status = req.body.status;
          bayRecord.save()
            .then(() => {
              res.statusCode = 200;
              res.setHeader('Content-type', 'application/json');
              res.json({ success: true });
            }, (err) => next(err));
        } else {
          res.statusCode = 200;
          res.setHeader('Content-type', 'application/json');
          res.json({ success: false });
        }
      }, (err) => next(err))
  }).delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    BayRecords.findOne({ user: req.user._id })
      .then((bayRecord) => {
        bayRecord.carts.orders.splice(req.params.index, 1)
        bayRecord.save().then((bayRecord) => {
          res.statusCode = 200;
          res.setHeader('Content-type', 'application/json');
          res.json(bayRecord);
        }, (err) => next(err));
      }).catch((err) => next(err));
  });
module.exports = bayRecordRouter;