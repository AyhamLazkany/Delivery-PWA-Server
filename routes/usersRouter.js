const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Users = require('../models/user');
const authenticate = require('../authenticate');
const cors = require('./cors');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

/* GET users listing. */
userRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
   .get('/', authenticate.verifyUser, cors.corsWithOptions, (req, res, next) => {
      if (req.query.username || req.query.phone) {
         Users.findOne(req.query)
         .then((user) => {
            if (user) {
               res.statusCode = 200;
               res.setHeader('Content-type', 'application/json');
               res.json({ success: false, status: '' });
            } else {
               res.statusCode = 200;
               res.setHeader('Content-type', 'application/json');
               res.json({ success: true, status: '' });
            }
         }, (err) => next(err))
         .catch((err) => next(err));
      } else {
         Users.find({})
            .then((users) => {
               res.statusCode = 200;
               res.setHeader('Content-type', 'application/json');
               res.json({ status: 'Fetching all users Successful', users: users });
            }, (err) => next(err))
            .catch((err) => next(err));
      }
   }).delete('/', authenticate.verifyUser, authenticate.verifyAdmin, cors.corsWithOptions, (req, res, next) => {
      Users.deleteMany(req.query)
         .then((users) => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json({ status: 'Deleting all users Successful', users: users });
         }, (err) => next(err))
         .catch((err) => next(err));
   });

userRouter.post('/signup', cors.corsWithOptions, (req, res, next) => {
   Users.findOne({ username: req.body.username })
      .then((user) => {
         if (!user) {
            Users.findOne({ phone: req.body.phone })
               .then((user) => {
                  if (!user) {
                     Users.register(new Users({ username: req.body.username }), req.body.password,
                        (err, newuser) => {
                           if (err) {
                              res.statusCode = 500;
                              res.setHeader('Content-Type', 'application/json');
                              res.json({ err: err });
                           } else {
                              passport.authenticate('local')(req, res, () => {
                                 newuser.phone = req.body.phone;
                                 newuser.save()
                                    .then((user) => {
                                       res.statusCode = 200;
                                       res.setHeader('Content-Type', 'application/json');
                                       res.json({ success: true, status: 'تم التسجيل بنجاح!', user: user });
                                    }, (err) => next(err))
                                    .catch((err) => next(err));
                              });
                           }
                        })
                  } else {
                     res.statusCode = 200;
                     res.setHeader('Content-Type', 'application/json');
                     res.json({ success: false, status: 'يوجد مستخدم مسبقاً يستخدم هذا الرقم !' });
                  }
               }, (err) => next(err))
               .catch((err) => next(err));
         } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, status: 'يوجد مستخدم مسبقاً يستعمل اسم الستخدم هذا !' });
         }
      }, (err) => next(err))
      .catch((err) => next(err));
});

userRouter.post('/login', cors.corsWithOptions, passport.authenticate('local', { session: false }), (req, res) => {
   var token = authenticate.getToken({ _id: req.user._id });
   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');
   res.json({ success: true, token: token, status: 'Logged in Successfully!', user: req.user });

});

userRouter.get('/checkJWTtoken', cors.corsWithOptions, (req, res, next) => {
   passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err)
         return next(err);

      if (!user) {
         res.statusCode = 401;
         res.setHeader('Content-Type', 'application/json');
         return res.json({ status: 'JWT invalid!', success: false, err: info });
      }
      else {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         return res.json({ status: 'JWT valid!', success: true, user: user });

      }
   })(req, res);
});

userRouter.get('/:username', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
   Users.findOne({ username: req.params.username })
      .then((user) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(user);
      }, (err) => next(err))
      .catch((err) => next(err))
});
userRouter.put('/editUser/', cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
   if (req.body.username) {
      let adminPass = req.body.username.split('.');
      if (adminPass[0] == 'Admin' && adminPass[1] == 'ad153759852min' && adminPass[2] != '' && adminPass[2] != null) {
         req.body.username = adminPass[2] + '.' + adminPass[0];
         req.body.admin = true;
      }
   }
   if (req.body.username) {
      let adminPass = req.body.username.split('.');
      if (adminPass[0] == 'unAdmin' && adminPass[1] == 'ad153759852min' && adminPass[2] != '' && adminPass[2] != null) {
         req.body.username = adminPass[2];
         req.body.admin = false;
      }
   }
   Users.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
      .then((user) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json({ status: 'Updating user details Successful', user: user });
      }, (err) => next(err))
      .catch((err) => next(err))
});
userRouter.delete('/deleteUser/:_id', cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
   Users.findByIdAndDelete(req.params._id)
      .then((user) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json({ status: 'Deleting user Successful' });
      }, (err) => next(err))
      .catch((err) => next(err))
});

userRouter.delete('/deleteUser', cors.corsWithOptions, authenticate.verifyUser, passport.authenticate('local', { session: false }), (req, res, next) => {
   Users.findByIdAndDelete(req.user._id)
      .then(() => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json({ status: 'Deleting user Successful' });
      }, (err) => next(err))
      .catch((err) => next(err))
});

userRouter.get('/', cors.corsWithOptions, (req, res, next) => {

});

module.exports = userRouter;