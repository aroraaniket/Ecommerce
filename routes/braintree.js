const express = require('express');
const { isAuth } = require('../utils');
const User = require('../models/user');
const braintree = require('braintree');
require('dotenv').config();
const router = express.Router();

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const generateToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};
router.get('/getToken/:userId', isAuth, generateToken);

module.exports = router;
