const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   dishes: {
      type: [Schema.Types.ObjectId],
      ref: 'dish'
   },
   quantitys: {
      type: [Number],
      required: true
   },
   bill: {
      type: Number,
      required: true
   },
   status: {
      type: String,
      required: true
   }
}, {
   timestamps: true
});

const bayRecSchema = new Schema({
   user: {
      type: String,
      required: true
   },
   orders: {
      type: [orderSchema],
      default: []
   }
});

var SaleRec = mongoose.model('bay', bayRecSchema);
module.exports = SaleRec;