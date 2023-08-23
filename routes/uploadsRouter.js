const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('./cors');
const authenticate = require('../authenticate');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/assets/img');
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname)
   },
});
const restaurantStorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/assets/img/restaurants');
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname)
   },
});
const dishStorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/assets/img/dishes');
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname)
   },
});
const sliderStorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/assets/img/slider');
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname)
   },
});
const categoryStorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/assets/img/categories');
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname)
   },
});
const labelsStorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/assets/img/labels');
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname)
   },
});

const imageFileFilter = (req, file, cb) => {
   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      err = new Error('You can upload only image files!');
      return cb(err, false);
   }
   cb(null, true);
}
const uploadRestaurantImg = multer({ storage: restaurantStorage, fileFilter: imageFileFilter });
const uploadDishImg = multer({ storage: dishStorage, fileFilter: imageFileFilter });
const uploadsliderImg = multer({ storage: sliderStorage, fileFilter: imageFileFilter });
const uploadcategoryImg = multer({ storage: categoryStorage, fileFilter: imageFileFilter });
const uploadLabelImg = multer({ storage: labelsStorage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

uploadRouter.route('/slider')
   .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
   .get(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('GET operation is not supported on \'/uploads/slider\'');
   }).post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, uploadsliderImg.single('imageFile'), (req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(req.file);
   }).put(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('PUT operation is not supported on \'/uploads/slider\'');
   }).delete(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('DELETE operation is not supported on \'/uploads/slider\'');
   });

uploadRouter.route('/restaurants')
   .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
   .get(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('GET operation is not supported on \'/uploads/restaurants\'');
   }).post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, uploadRestaurantImg.single('imageFile'), (req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(req.file);
   }).put(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('PUT operation is not supported on \'/uploads/restaurants\'');
   }).delete(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('DELETE operation is not supported on \'/uploads/restaurants\'');
   });

uploadRouter.route('/dishes')
   .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
   .get(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('GET operation is not supported on \'/uploads/dishes\'');
   }).post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, uploadDishImg.single('imageFile'), (req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(req.file);
   }).put(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('PUT operation is not supported on \'/uploads/dishes\'');
   }).delete(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('DELETE operation is not supported on \'/uploads/dishes\'');
   });

uploadRouter.route('/categories')
   .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
   .get(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('GET operation is not supported on \'/uploads/categories\'');
   }).post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, uploadcategoryImg.single('imageFile'), (req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(req.file);
   }).put(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('PUT operation is not supported on \'/uploads/categories\'');
   }).delete(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('DELETE operation is not supported on \'/uploads/categories\'');
   });

uploadRouter.route('/labels')
   .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
   .get(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('GET operation is not supported on \'/uploads/labels\'');
   }).post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, uploadLabelImg.single('imageFile'), (req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(req.file);
   }).put(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('PUT operation is not supported on \'/uploads/labels\'');
   }).delete(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('DELETE operation is not supported on \'/uploads/labels\'');
   });

module.exports = uploadRouter;