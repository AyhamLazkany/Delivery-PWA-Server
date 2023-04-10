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
      type: String,
      required: true
   },
   plugins: {
      type: [String],
      default: []
   },
   phone: {
      type: String,
      required: true
   },
   location: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   }
}, {
   timestamps: true
});

var Restaurant = mongoose.model('restaurant', resSchema);
module.exports = Restaurant;