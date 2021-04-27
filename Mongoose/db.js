const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log('mongoose connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
