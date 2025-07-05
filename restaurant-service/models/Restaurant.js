const mongoose = require('mongoose');
const RestaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  isOpen: { type: Boolean, default: true }
});
module.exports = mongoose.model('Restaurant', RestaurantSchema);
