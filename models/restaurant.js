const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resSchema = new Schema({
   img: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   type: {
      type: String,
      required: true
   },
   categories: {
      type: [String],
      required: true
   },
   plugins: {
      type: [String],
      required: false
   },
   phone: {
      type: [Number],
      required: false
   },
   location: {
      type: String,
      required: false
   }, 
   openned: {
      type: Boolean,
      default: false,
      required: true
   }, 
   closetime: {
      type: String,
      required: true
   }, 
   opentime: {
      type: String,
      required: true
   }, 
   counter: {
      type: Number,
      required: false,
      default: 0
   }
});

var Restaurant = mongoose.model('restaurant', resSchema);
module.exports = Restaurant;