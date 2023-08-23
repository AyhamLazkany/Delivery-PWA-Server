const express = require('express');
const bodyParser = require('body-parser');
const Carts = require('../models/cart');
const authenticate = require('../authenticate');
const cors = require('./cors');

const cartRouter = express.Router();
cartRouter.use(bodyParser.json());

/* GET Carts listing. */
cartRouter.route('/')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Carts.findOne({ user: req.user._id })
      .then((cart) => {
        if(cart) {
          cart.populate('orders.dish').then((cart) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(cart.orders);
          }, (err) => next(err));
        } else {
          res.statusCode = 200;
          res.setHeader('Content-type', 'application/json');
          res.json([]);
        }
      }, (err) => next(err))
      .catch((err) => next(err));
  }).post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Carts.findOne(req.query)
      .then((cart) => {
        if (!cart) {
          Carts.create({ user: req.user._id, orders: [req.body] })
            .then((cart) => {
              cart.populate('orders.dish').then((cart) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(cart.orders[cart.orders.length - 1]);
              }, (err) => next(err));
            }, (err) => next(err))
        } else {
          cart.orders.push(req.body);
          cart.save();
          cart.populate('orders.dish').then((cart) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(cart.orders[cart.orders.length - 1]);
          }, (err) => next(err));

        }
      }, (err) => next(err))
      .catch((err) => next(err));
  }).put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 404;
    res.end('Put operation is not supported on \'/Carts\'');
  }).delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Carts.deleteOne({ user: req.user._id })
      .then((delResult) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
        res.json(delResult);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

cartRouter.route('/:index')
  .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Carts.findOne({ user: req.user._id })
      .then((cart) => {
        cart.orders.splice(req.params.index, 1)
        cart.save()
          .then((cart) => {
            cart.populate('orders.dish');
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json(cart);
          }, (err) => next(err));
      }).catch((err) => next(err));
  });

module.exports = cartRouter;