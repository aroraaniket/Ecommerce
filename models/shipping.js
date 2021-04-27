const mongoose = require('mongoose');
const shippingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  Address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
});
module.exports = Shipping = mongoose.model('Shipping', shippingSchema);
