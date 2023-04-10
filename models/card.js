const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   dish: {
      type: [Schema.Types.ObjectId],
      ref: 'dish'
   },
   quantity: {
      type: Number,
      required: true
   },
   plugins: {
      type: [String],
      default: []
   }
});

const cardSchema = new Schema({
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

var Card = mongoose.model('card', cardSchema);
module.exports = Card;