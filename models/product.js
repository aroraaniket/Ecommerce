const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    image:{
      type:Array, 
      reuire:true
    }
  , 
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },

    category: {
      type: String,
      trim: true,
      required: true,
    },
    Sex:{
type:String,
required:true
    },
     
    countInStock: {
      type: Number,
      default: 0,
      required: true,
    },
    Size:{
type:String,
default:"S",
required:true,

    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      required: true,
    },
    numReviews: {
      type: Number,
      default: 0,
      required: true,
    },

Wishlist:{
  type:Boolean,
  default:false,
  required:true,
},
Cart:{ 
  type:Boolean,
  default:false,
 
},


  },
  { timestamps: true }
);
module.exports = Product = mongoose.model('Product', productSchema);
