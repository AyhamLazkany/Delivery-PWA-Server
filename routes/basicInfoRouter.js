const express = require('express');
const bodyParser = require('body-parser');
const Infos = require('../models/basicInfo');
const authenticate = require('../authenticate');
const cors = require('./cors');

const infoRouter = express.Router();
infoRouter.use(bodyParser.json());

/* GET Infos listing. */
infoRouter.route('/')
   .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
   .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
      Infos.findOne({})
         .then((infos) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            if (infos) res.json({ exists: true, infos: infos });
            else res.json({ exists: false, infos: {} });
         }, (err) => next(err))
         .catch((err) => next(err));
   }).post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
      Infos.findOne({})
         .then((infos) => {
            if (!infos) {
               Infos.create(req.body)
                  .then((infos) => {
                     res.statusCode = 200;
                     res.setHeader('Content-type', 'application/json');
                     if (infos) res.json({ success: true, infos: infos });
                     else res.json({ success: false, infos: {} });
                  }, (err) => next(err))
            } else {
               infos.labelOne = req.body.labelOne; infos.imgOne = req.body.imgOne;
               infos.labelTwo = req.body.labelTwo; infos.imgTwo = req.body.imgTwo;
               infos.labelThree = req.body.labelThree; infos.imgThree = req.body.imgThree;
               infos.deliveryPrice = req.body.deliveryPrice;
               infos.save().then((infos) => {
                  res.statusCode = 200;
                  res.setHeader('Content-type', 'application/json');
                  if (infos) res.json({ success: true, infos: infos });
                  else res.json({ success: false, infos: {} });
               }, (err) => next(err));
            }
         }, (err) => next(err))
         .catch((err) => next(err));
   }).put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
      res.statusCode = 404;
      res.end('Put operation is not supported on \'/Infos\'');
   }).delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
      Infos.deleteOne({})
         .then((delResult) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            if (delResult) res.json({ success: true, delResult: delResult });
            else res.json({ success: false });
         }, (err) => next(err))
         .catch((err) => next(err));
   });

module.exports = infoRouter;