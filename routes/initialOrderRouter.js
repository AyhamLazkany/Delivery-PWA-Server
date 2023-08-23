const express = require('express');
const bodyParser = require('body-parser');
const InitialOrder = require('../models/initialOrder');
const authenticate = require('../authenticate');
const cors = require('./cors');

const initialOrderRouter = express.Router();
initialOrderRouter.use(bodyParser.json());

initialOrderRouter.route('/')
   .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
   .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
      InitialOrder.findOne({ user: req.user._id })
         .then((initialOrder) => {
            if (initialOrder) {
               res.writeHead(200, {
                  'Content-Type': 'text/event-stream',
                  'Cache-Control': 'no-cache',
                  Connection: 'keep-alive'
               });

               res.write(JSON.stringify({ exists: true, status: initialOrder.status }));

               let stream = setInterval(() => {
                  InitialOrder.findOne({ user: req.user._id }).then((initOrder) => {
                     if (initOrder) {
                        res.write(JSON.stringify({ exists: true, status: initOrder.status }));
                     } else {
                        res.write(JSON.stringify({ exists: false, status: '' }));
                        clearInterval(stream);
                     }
                  })
               }, 30000);
               // const collection = require('mongoose').connection.getClient().db('delivery').collection('initialOrder');
               // const changeStream = collection.watch();
               // changeStream.on('change', next => {
               //    res.write(JSON.stringify({ exists: true, next: next }));
               //    console.log('change is done' + 'next: ' + next);
               // });

               req.on('close', () => {
                  // changeStream.close();
                  res.end();
               });
            } else {
               res.statusCode = 200;
               res.setHeader('Content-type', 'application/json');
               res.json({ exists: false, status: '' });
            }
         }, (err) => next(err))
         .catch((err) => next(err));
   }).post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
      InitialOrder.create({ user: req.user._id, status: req.body.status, time: '.', delevaryboy: '.' })
         .then((initialOrder) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json({ success: true, status: initialOrder.status });
         }, (err) => next(err))
         .catch((err) => next(err));
   }).put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
      InitialOrder.findOneAndUpdate({ user: req.user._id }, { $set: req.body }, { new: true })
         .then((initialOrder) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json({ success: true, status: initialOrder.status });
         }, (err) => next(err))
         .catch((err) => next(err));
   }).delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
      InitialOrder.deleteOne({ user: req.user._id })
         .then(() => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json({ success: true });
         }, (err) => next(err))
         .catch((err) => next(err));
   })

module.exports = initialOrderRouter;