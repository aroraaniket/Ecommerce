const express = require('express');
const { isAuth } = require('../utils');
const Cart = require('../models/cart');
const Product = require('../models/product');

const router = express.Router();

router.get('/', async (req, res) => {
  const cartItems = await Cart.find({});
  res.json(cartItems);
});

router.post('/:id', async (req, res) => {
  const productId = req.params.id;

  // const { cartItems } = req.body;
  try {
    const cartItems = await Product.findById(productId);
    //console.log(cart);
    // const cartField = { cartItems };
    //if (cart) {
    const cart = new Cart({ cartItems });
    // }
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
