import axios from 'axios';
import Cookie from 'js-cookie';
import {
  GET_BRAINTREE_TOKEN,
  GET_BRAINTREE_TOKEN_FAIL,
} from '../constants/BraintreeConstant';

const getBraintreeToken = (userId, token) => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/braintree/getToken/' + userId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    dispatch({
      type: GET_BRAINTREE_TOKEN,
      payload: data,
    });
    Cookie.set('brainTreeInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_BRAINTREE_TOKEN_FAIL,
      payload: error.message,
    });
  }
};
export { getBraintreeToken };
