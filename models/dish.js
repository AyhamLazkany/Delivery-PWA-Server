const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
   img: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   resname: {
      type: String,
      required: true
   },
   resId: {
      type: String,
      required: true
   },
   category: {
      type: String,
      required: true
   },
   plugins: {
      type: [String],
      default: []
   },
   description: {
      type: String,
      default: ''
   },
   price: {
      type: Number,
      default: 0
   },
   rate: {
      type: Number,
      default: 0
   }
});

var Dish = mongoose.model('dish', dishSchema);
module.exports = Dish;