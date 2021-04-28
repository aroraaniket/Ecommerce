import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productListMENReducer,
  productListKIDSReducer,
  productListWOMENReducer
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
/*import { 
  userSigninReducer,
  userRegisterReducer,
  loadUSerReducer,
} from './reducers/signinReducer';*/
import { alertReducer } from './reducers/alertReducer';
/* changed on 7 april 2021 import { BraintreeReducer } from './reducers/Braintreereducer';*/
//import { logoutreducer } from './reducers/signinReducer';
import { userReducer } from './reducers/signinReducer';
import { shippingReducer } from './reducers/shippingReducer';
import {wishlistReducer} from './reducers/whishlistReducer'

const cartItems = Cookie.getJSON('cartItems') || [];
 const shipping = Cookie.getJSON('shipping') || {}; 
//const shipping = Cookie.getJSON('shipping') || {};
const payment = Cookie.getJSON('payment') || {};
const wishlistItems=Cookie.getJSON('wishlistItems') || [];
/*changed on 7 april 2021    const userInfo = Cookie.getJSON('userInfo') || null;*/
//const InitialState = Cookie.getJSON('InitialState') || {};
//const brainTreeInfo = Cookie.getJSON('Info') || [];

const initialState = {
  // cart: { cartItems, shipping, payment },
  cart: { cartItems, payment },
  shipping:{shipping},
  wishlist:{wishlistItems}

  //userSignin: { userInfo },
  // userSignin: { InitialState },
  // brainTree: { brainTreeInfo, Instance: {}, error: {} },
  
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userData: userReducer,
  productListMen:productListMENReducer,
  productListWomen:productListWOMENReducer,
  productListKids:productListKIDSReducer,
  // userSignin: userSigninReducer,
  //userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  alert: alertReducer,
  shipping: shippingReducer,
  wishlist:wishlistReducer
  //logout: logoutreducer,
  //loadUser: loadUSerReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
