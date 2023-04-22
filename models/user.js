const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
   phone: {
      type: Number,
      default: 0,
      unique: true
   },
   addresses: {
      type: [String],
      required: false
   },
   currAdd: {
      type: String,
      required: false
   },
   admin: {
      type: Boolean,
      default: false
   }
}, {
   timestamps: true
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('user', userSchema);
module.exports = User;