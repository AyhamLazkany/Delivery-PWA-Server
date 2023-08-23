const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
   deliveryPrice: {
      type: Number,
      required: true,
      default: 0
   },
   labelOne: {
      type: String,
      required: false
   },
   imgOne: {
      type: String,
      required: false
   },
   labelTwo: {
      type: String,
      required: false
   },
   imgTwo: {
      type: String,
      required: false
   },
   labelThree: {
      type: String,
      required: false
   },
   imgThree: {
      type: String,
      required: false
   }
});

var Info = mongoose.model('info', infoSchema);
module.exports = Info;