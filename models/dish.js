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
      required: true
   },
   rate: {
      type: Number,
      default: 4
   }
}, {
   timestamps: true
});

var Dish = mongoose.model('dish', dishSchema);
module.exports = Dish;