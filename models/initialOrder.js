const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const initialOrderSchema = new Schema({
   user: {
      type: String,
      required: true
   },
   status: {
      type: String,
      required: true
   },
   time: {
      type: String,
      required: true
   },
   delevaryboy: {
      type: String,
      required: true
   }
});

var initialOrder = mongoose.model('initialOrder', initialOrderSchema);
module.exports = initialOrder;