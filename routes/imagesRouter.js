const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const cors = require('./cors');
const fs = require('fs');
const path = require('path');


const imageRouter = express.Router();
imageRouter.use(bodyParser.json());

imageRouter.route('/sliderimages')
   .options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
   .get(cors.cors, (req, res, next) => {
      const images = [];
      fs.readdir('public/assets/img/slider', (err, files) => {
         if (err) {
            res.statusCode = 500;
            res.setHeader('Content-type', 'application/json');
            return res.json({ err: 'Error getting images' });
         }
         files.forEach((file) => {
            if (path.extname(file) === '.jpg' || path.extname(file) === '.jpeg' || path.extname(file) === '.png') { // Check if file is an image
               images.push(file);
            }
         });
         res.statusCode = 200;
         res.setHeader('Content-type', 'application/json');
         res.json(images);
      });
   });

imageRouter.route('/:imagename')
.options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   fs.unlink('public/assets/img/' + req.params.imagename, function (err) {
      deleteResponse(err, res);
   });
});
imageRouter.route('/restaurants/:imagename')
.options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   fs.unlink('public/assets/img/restaurants/' + req.params.imagename, function (err) {
      deleteResponse(err, res);
   });
});
imageRouter.route('/dishes/:imagename')
.options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   fs.unlink('public/assets/img/dishes/' + req.params.imagename, function (err) {
      deleteResponse(err, res);
   });
});
imageRouter.route('/slider/:imagename')
.options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   fs.unlink('public/assets/img/slider/' + req.params.imagename, function (err) {
      deleteResponse(err, res);
   });
});
imageRouter.route('/categories/:imagename')
.options(cors.corsWithOptions, (req, res, next) => { res.sendStatus = 200; })
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   fs.unlink('public/assets/img/categories/' + req.params.imagename, function (err) {
      deleteResponse(err, res);
   });
});

var deleteResponse = (err, res) => {
   if (err && err.code == 'ENOENT') {
      res.statusCode = 404;
      res.setHeader('Content-type', 'application/json');
      res.json({ success: false, error: err });
   } else if (err) {
      res.statusCode = 400;
      res.setHeader('Content-type', 'application/json');
      res.json({ success: false, error: err });
   } else {
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json({ success: true, status: 'successfully deleted' });
   }
};

module.exports = imageRouter;