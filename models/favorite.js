const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
   user: {
      type: String,
      required: true
   },
   dishes: {
      type: [Schema.Types.ObjectId],
      ref: 'dish',
      default: []
   },
   restaurants: {
      type: [Schema.Types.ObjectId],
      ref: 'restaurant',
      default: []
   }
});

var Favorite = mongoose.model('favorite', favoriteSchema);
module.exports = Favorite;