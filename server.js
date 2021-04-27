const express = require('express');

const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const dotenv = require("dotenv");

dotenv.config();
const app = express();
//connecting mongoose
connectDB();
//body-parser
app.use(bodyParser.json()); 
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/user'));
app.use('/api/products', require('./routes/product'));
app.use('/api/shipping', require('./routes/shipping'));
app.use('/api/cart', require('./routes/cart'));
//app.use('/api/braintree', require('./routes/braintree'));
/*app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x._id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).json({ msg: 'product Not found' });
  }
});
app.get('/api/products', (req, res) => {
  res.json(data.products);
});*/
//Serve static assests in production




const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on PORT ${port}`);
});
 