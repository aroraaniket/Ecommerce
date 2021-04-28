const {
  USER_SHIPPING_SUCCESS,
  USER_SHIPPPING_FAIL,
  LOAD_SHIPPING_SUCCESS,
} = require('../constants/cartConstant');

const InitialState = {
  shipping: null,
  error: null,
};

function shippingReducer(state = InitialState, action) {
  const { type, payload } = action;
  switch (type) { 
    case LOAD_SHIPPING_SUCCESS:
      return {
        ...state,
        shipping: payload,
      };
    case USER_SHIPPING_SUCCESS:
      return {
        ...state,
        shipping: payload,
      };
    case USER_SHIPPPING_FAIL:
      return {
        error: payload,
      };

    default:
      return state;
  }
}
export { shippingReducer };
