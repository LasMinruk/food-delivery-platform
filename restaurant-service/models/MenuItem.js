const mongoose = require('mongoose');
const MenuItemSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  name: String,
  price: Number,
  available: { type: Boolean, default: true }
});
module.exports = mongoose.model('MenuItem', MenuItemSchema);
