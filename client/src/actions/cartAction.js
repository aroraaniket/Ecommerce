import axios from 'axios';
import Cookie from 'js-cookie';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM, 
  // CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from '../constants/cartConstant';
//productId, qty, user
const addToCart = (productId, qty, Size,user) => async (dispatch, getState) => {
  /* const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ productId, qty, user });*/
  try {
    const { data } = await axios.get('/api/products/' + productId);
    //const { data } = await axios.post('/api/cart', body, config);
    dispatch({
      type: CART_ADD_ITEM, 
      payload: {
        _id: data._id,
        name: data.name,
        image: data.image,  
        price: data.price,
        countInStock: data.countInStock,
        brand:data.brand,
        description:data.description,
        Sex:data.Sex,
        category:data.category,
        Wishlist:data.Wishlist,
        qty,
        Size ,
        user,
       
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
  } catch (error) {}
};
const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({ 
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  //console.log(getState());
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
};
//save shipping
/*onst saveShipping = (data) => async (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_SHIPPING,
    payload: data,
  });
  const {
    cart: { shipping },
  } = getState();
  Cookie.set('shipping', JSON.stringify(shipping));
};*/
//save payment
const savePayment = (data) => async (dispatch, getState) => {
  dispatch({
    type: CART_SAVE_PAYMENT,
    payload: data,
  });
  const {
    cart: { payment },
  } = getState();
  Cookie.set('payment', JSON.stringify(payment));
};
export { addToCart, removeFromCart, savePayment };
