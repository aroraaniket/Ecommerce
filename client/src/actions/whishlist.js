 import axios from 'axios'
 import Cookie from 'js-cookie'
 import {
  Wishlist_ADD_ITEM,Wishlist_REMOVE_ITEM
 } from '../constants/whistlistconstant'


 const addToWishlist =(productId,user)=> async (dispatch,getState)=>{ 

    try {
        const { data } = await axios.get('/api/products/' +productId);
        //const { data } = await axios.post('/api/cart', body, config);
        dispatch({
          type: Wishlist_ADD_ITEM, 
          payload: {
            _id: data._id,
            name: data.name, 
            image: data.image,  
            price: data.price,  
            countInStock: data.countInStock,
            description:data.description,
            Wishlist:data.Wishlist,
            brand:data.brand,
            Sex:data.Sex,
            category:data.category,
            Size:data.Size,
            user, 
           
          }, 
        });
        //console.log(getState());
        const { 
          wishlist: { wishlistItems},
        } = getState();
        Cookie.set('wishlistItems', JSON.stringify(wishlistItems));
      } catch (error) {}




 }
 const removeFromWishlist = (productId) => async (dispatch, getState) => {
    dispatch({
      type: Wishlist_REMOVE_ITEM,
      payload: productId,
    });
    //console.log(getState());
    const {
      wishlist: { wishlistItems},
    } = getState();
    Cookie.set('wishlistItems', JSON.stringify(wishlistItems));
  };

  export {addToWishlist,removeFromWishlist}