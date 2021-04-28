import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST, 
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_LIST_MEN_REQUEST,
  PRODUCT_LIST_MEN_SUCCESS,
  PRODUCT_LIST_MEN_FAIL,
  PRODUCT_LIST_KIDS_FAIL,
  PRODUCT_LIST_KIDS_SUCCESS,
  PRODUCT_LIST_KIDS_REQUEST,
  PRODUCT_LIST_WOMEN_FAIL,
  PRODUCT_LIST_WOMEN_SUCCESS,
  PRODUCT_LIST_WOMEN_REQUEST
} from '../constants/product';

function productListReducer(state = { products: [] }, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
       return state;
  }
}
function productListMENReducer(state = { products: [] }, action) {
  const { type, payload } = action;
  switch (type) { 
    case PRODUCT_LIST_MEN_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_MEN_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_LIST_MEN_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
       return state;
  }
}
 



function productListWOMENReducer(state = { products: [] }, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_WOMEN_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_WOMEN_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_LIST_WOMEN_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
       return state;
  }
}

function productListKIDSReducer(state = { products: [] }, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_KIDS_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_KIDS_SUCCESS:
      return { loading: false, products: payload };
    case PRODUCT_LIST_KIDS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
       return state;
  }
}






function productDetailsReducer(state = { product: {} }, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
function productSaveReducer(state = { product: {} }, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_SAVE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_SAVE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
function productDeleteReducer(state = { product: {} }, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
export {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productListMENReducer,
  productListWOMENReducer,
  productListKIDSReducer,
};
