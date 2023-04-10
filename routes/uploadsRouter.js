const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('./cors');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/assets/img');
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname)
   },
});
const userStorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/assets/img/users');
   },
   filename: (req, file, cb) => {
      cb(null, file.originalname)
   },
});
const retaurantStorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/assets/img/retaurants');
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
const imageFileFilter = (req, file, cb) => {
   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      err = new Error('You can upload only image files!');
      return cb(err, false);
   }
   cb(null, true);
}
const upload = multer({ storage: storage, fileFilter: imageFileFilter });
const uploadUserImg = multer({ storage: userStorage, fileFilter: imageFileFilter });
const uploadRetaurantImg = multer({ storage: retaurantStorage, fileFilter: imageFileFilter });
const uploadDishImg = multer({ storage: dishStorage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

uploadRouter.route('/:')
   .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
   .get(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('GET operation is not supported on \'/upload\'');
   }).post(cors.corsWithOptions, upload.single('imageFile'), (req, res, next) => {
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(req.file);
   }).put(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('PUT operation is not supported on \'/imageUpload\'');
   }).delete(cors.corsWithOptions, (req, res) => {
      res.statusCode = 404;
      res.end('DELETE operation is not supported on \'/imageUpload\'');
   });


module.exports = uploadRouter;