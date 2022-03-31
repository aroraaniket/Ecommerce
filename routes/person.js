const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const  Person= require('../models/Schema');

//get current user shipping address 
router.get('/me', async function (req, res) {
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

router.post('/', async (req, res) => {
  const { name,age } = req.body;
  
let author;
  try {
     author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name,
        age
      });
      
      author.save(function (err) {
        if (err) return handleError(err);
      
        const story1 = new Story({
          title: 'Casino Royale',
          author: author._id    // assign the _id from the person
        });
      
        story1.save(function (err) {
          if (err) return handleError(err);
          // that's it!
        });
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
