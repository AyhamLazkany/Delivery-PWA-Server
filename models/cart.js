const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   dish: {
      type: Schema.Types.ObjectId,
      ref: 'dish'
   },
   quantity: {
      type: Number,
      required: true
   },
   bill: {
      type: Number,
      required: true
   },
   plugins: {
      type: [String],
      default: []
   }
});

const cartSchema = new Schema({
   user: {
      type: String,
      required: true
   },
   orders: {
      type: [orderSchema],
      default: []
   }
}, {
   timestamps: true
});

var Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;