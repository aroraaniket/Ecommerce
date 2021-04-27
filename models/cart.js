const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  cartItems: {
    type: mongoose.Schema.Types.Mixed,
  },
});
module.exports = Cart = mongoose.model('Cart', cartSchema);
