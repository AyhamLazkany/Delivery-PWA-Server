const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Users = require('./models/user');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const config = require('./config');

exports.local = passport.use(new localStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

exports.getToken = (payload) => {
   return jwt.sign(payload, config.secretKey);
};

const options = {};
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JWTStrategy(options,
   (payload, done) => {
      Users.findOne({ _id: payload._id }, (err, user) => {
         if (err) return done(err, false);
         else if (user) return done(null, user);
         else return done(null, false);

      });
   }));

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = (req, res, next) => {
   if (req.user.admin == true) {
      next();
   }
   else {
      err = new Error('You are not authorized to perform this operation!');
      err.status = 403;
      return next(err);
   }
}