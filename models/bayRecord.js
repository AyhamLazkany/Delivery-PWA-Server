const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
   _id: {
      type: String,
      required: true
   },
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
   counter: {
      type: Number,
      required: false,
      default: 0
   }
});

const orderSchema = new Schema({
   dish: {
      type: dishSchema,
      required: true
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
   _id: {
      type: String,
      required: true
   },
   orders: {
      type: [orderSchema],
      default: []
   },
   status: {
      type: String,
      default: 'بانتظار الموافقة'
   },
   total: {
      type: Number,
      required: false,
      default: 0
   },
   date: {
      type: String,
      default: 'اكثر من شهر'
   }
});

const bayRecordSchema = new Schema({
   user: {
      type: String,
      required: true
   },
   carts: {
      type: [cartSchema],
      default: []
   }
});

var BayRecord = mongoose.model('bayRecord', bayRecordSchema);
module.exports = BayRecord;