const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleRecSchema = new Schema({
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
   }
}, {
   timestamps: true
});

var SaleRec = mongoose.model('saleRec', saleRecSchema);
module.exports = SaleRec;