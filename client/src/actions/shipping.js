import axios from 'axios';
import Cookie from 'js-cookie'; 
import {
  USER_SHIPPING_SUCCESS,
  USER_SHIPPPING_FAIL,
  LOAD_SHIPPING_SUCCESS,
} from '../constants/cartConstant'; 

//load Shipping
const loadShipping = () => async (dispatch,getState) => {
  try {
    const { data } = await axios.get('/api/shipping/me');
    dispatch({
      type: LOAD_SHIPPING_SUCCESS,
      payload: data,
    });
   
  } catch (error) {
    // 
  }
};

const saveShipping = (Address, city, postalCode, Country) => async (dispatch,getState) => {
  const config = { 
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ Address, city, postalCode, Country });
  try {
    const { data } = await axios.post('/api/shipping', body, config);
    dispatch({
      type: USER_SHIPPING_SUCCESS,
      payload: data, 
    });
    console.log(getState());
    const {
      userShipping: { shipping }, 
    } = getState();
    Cookie.set('shipping', JSON.stringify(shipping));

  } catch (error) {
   

    dispatch({
      type: USER_SHIPPPING_FAIL,
      payload: error.message,
    });
  }
  



  
};
export { saveShipping, loadShipping };
