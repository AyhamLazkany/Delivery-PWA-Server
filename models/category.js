const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
   img: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true
   }
});

var Category = mongoose.model('category', categorySchema);
module.exports = Category;