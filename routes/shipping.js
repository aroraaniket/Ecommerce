const express = require('express');
const router = express.Router();
const { isAuth } = require('../utils'); 
const Shipping = require('../models/shipping');

//get current user shipping address 
router.get('/me', isAuth, async function (req, res) {
  const shipping = await Shipping.findOne({
    user: req.user.id,
  }).populate('user', ['name']);
  // console.log(user);
  try { 
    if (!shipping) {
      return res
        .status(400)
        .json({ msg: 'There is no shipping address for this user' });
    }
    res.json(shipping);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
}); 

router.post('/', isAuth, async (req, res) => {
  const { Address, city, postalCode, Country } = req.body;
  const shippingFields = {
    user: req.user.id, 
    Address,
    city,
    postalCode,
    Country,
  };

  try {
    let shipping = await Shipping.findOne({ user: req.user.id });
    if (shipping) {
      //update
      shipping = await Shipping.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: shippingFields,
        },
        { new: true }
      );
      return res.json(shipping);
    }
    shipping = new Shipping({
      user: req.user.id,
      Address,
      city,
      postalCode,
      Country,
    });
    await shipping.save();
    res.json(shipping);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
//get user address
router.get('/user/:user_id', async function (req, res) {
  try {
    const shipping = await Shipping.findOne({
      user: req.params.user_id,
    }).populate('user', ['name']);
    console.log(shipping);
    if (!shipping) {
      return res.status(400).json({ msg: 'No shipping address found' });
    }
    res.json(shipping);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'No shipping address  found' });
    }
    res.status(500).send('server error');
  }
});
//delete shipping address
router.delete('/', isAuth, async function (req, res) {
  try {
    //remove shipping
    await Shipping.findOneAndRemove({ user: req.user.id });

    res.json({ msg: 'Shipping Address deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
});
module.exports = router;
