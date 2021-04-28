import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  //CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from '../constants/cartConstant';
 
function cartReducer(
  state = { cartItems: [],/* shipping: {},*/ payment: {} },
  action
) {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM: 
      const item = payload;
      const product = state.cartItems.find((x) => x._id === item._id);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) => 
            x._id === product._id ? item : x 
          ),
          cartUser: payload.user,
        };
      }
      return { cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x._id !== payload),
      };
    /*  case CART_SAVE_SHIPPING:
      return {
        ...state,
        shipping: payload,
      };*/
    case CART_SAVE_PAYMENT:
      return {
        ...state,
        payment: payload,
      };
    default:
      return state;
  }
}
export { cartReducer };
