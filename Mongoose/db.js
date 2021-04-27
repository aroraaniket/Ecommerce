const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
const config = require('config');
const db = config.get('mongoURI');
const connectDB = async () => {
  try {
    mongoose.connect(db, {
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
