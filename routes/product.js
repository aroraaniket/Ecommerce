const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const { isAdmin, isAuth } = require('../utils');
//get all products
router.get('/', async (req, res) => {
  const products = await Product.find({}); 
  res.json(products);
});
router.get('/:id', async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ msg: 'Product Not Found' });
  }
});
 
router.get('/shop/men', async (req, res) => {
  const product = await Product.find({Sex:'M'});
 // console.log(product);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ msg: 'Product Not Found' });
  }
});

router.get('/shop/women', async (req, res) => {
  const product = await Product.find({Sex:'F'});
  //console.log(product);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ msg: 'Product Not Found' });
  }
});
router.get('/shop/kids', async (req, res) => {
  const product = await Product.find({Sex:'kid'});
  //console.log(product);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ msg: 'Product Not Found' });
  }
});

//create
router.post('/', isAuth, async (req, res) => {
  const product = new Product({ 
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    brand: req.body.brand,  
    description: req.body.description,
    category: req.body.category, 
    rating: req.body.rating,
    Sex:req.body.Sex,
    countInStock: req.body.countInStock,
    numReviews: req.body.numReviews,
    Size:req.body.Size, 
    Wishlist:false,
    Cart:false
   
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(200)
      .send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: 'Error in Creating product' });
});
//update
router.put('/:id', isAuth, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.Sex=req.body.Sex;
    product.description = req.body.description;
    product.Wishlist=req.body.Wishlist;
    product.Cart=req.body.Cart;
    
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedProduct });
        
    }
    //console.log(updatedProduct);
  }
  return res.status(500).send({ message: 'Error in Creating product' });
});
//Delete
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deleteProduct = await Product.findById(req.params.id);
  if (deleteProduct) {
    await deleteProduct.remove();
    res.send({ msg: 'Product Deleted' });
  } else {
    res.send('Error in Deletion');
  }
});
module.exports = router;
