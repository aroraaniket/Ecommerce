const {
  GET_BRAINTREE_TOKEN,
  GET_BRAINTREE_TOKEN_FAIL,
} = require('../constants/BraintreeConstant');

function BraintreeReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BRAINTREE_TOKEN:
      return {
        ...state,
        Info: payload,
      };
    case GET_BRAINTREE_TOKEN_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
export { BraintreeReducer };
