const express = require('express');
const bodyParser = require('body-parser');
const Categories = require('../models/category');
const authenticate = require('../authenticate');
const cors = require('./cors');

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

/* GET Categories listing. */
categoryRouter.route('/')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.cors, (req, res, next) => {
    Categories.find(req.query)
      .then((Categories) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(Categories);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Categories.create(req.body)
      .then((category) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(category);
      }, (err) => next(err))
      .catch((err) => next(err));
  }).put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 404;
    res.end('Put operation is not supported on \'/Categories\'');
  }).delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Categories.deleteMany(req.query)
      .then((delResult) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(delResult);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = categoryRouter;