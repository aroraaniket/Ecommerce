import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS, 
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_LIST_MEN_REQUEST,
  PRODUCT_LIST_MEN_SUCCESS,
  PRODUCT_LIST_MEN_FAIL,
  
  PRODUCT_LIST_KIDS_REQUEST,
  PRODUCT_LIST_KIDS_SUCCESS,
  PRODUCT_LIST_KIDS_FAIL,
  PRODUCT_LIST_WOMEN_REQUEST,
  PRODUCT_LIST_WOMEN_SUCCESS,
  PRODUCT_LIST_WOMEN_FAIL
} from '../constants/product';
import axios from 'axios'; 
//show list of product
const listProducts = () => async (dispatch) => {
  try { 
    dispatch({ type: PRODUCT_LIST_REQUEST });  
    const { data } = await axios.get('/api/products'); 
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    }); 
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};


const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get('/api/products/' + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};





const listMenproducts=()=>async(dispatch)=>{

  try { 
    dispatch({ type: PRODUCT_LIST_MEN_REQUEST }); 
    const { data } = await axios.get('/api/products/shop/men');
    dispatch({
      type: PRODUCT_LIST_MEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_MEN_FAIL, payload: error.message });
  }
 
 

}
const listwomenproducts=()=>async(dispatch)=>{

  try { 
    dispatch({ type: PRODUCT_LIST_WOMEN_REQUEST });
    const { data } = await axios.get('/api/products/shop/women');
    dispatch({
      type: PRODUCT_LIST_WOMEN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_WOMEN_FAIL, payload: error.message });
  }



}



const listkidsproducts=()=>async(dispatch)=>{

  try { 
    dispatch({ type: PRODUCT_LIST_KIDS_REQUEST});
    const { data } = await axios.get('/api/products/shop/kids');
    dispatch({
      type: PRODUCT_LIST_KIDS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_KIDS_FAIL, payload: error.message });
  }



}
















//create or update product
const saveProduct = (product) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_SAVE_REQUEST,
      payload: product,
    });
    /*   const {
      userSignin: { userInfo },
    } = getState();
*/
    if (!product._id ) {
      const { data } = await axios.post(
        '/api/products',
        product /*, {
        headers: {
          Authorization: 'Bearer' + ' ' + userInfo.token,
        },
      }*/
      );
      dispatch({
        type: PRODUCT_SAVE_SUCCESS,
        payload: data,
      });
    } else {
      const { data } = await axios.put( 
        '/api/products/' + product._id,
        product /*,
        {
          headers: {
            Authorization: 'Bearer' + ' ' + userInfo.token,
          },
        }*/
      );

      dispatch({
        type: PRODUCT_SAVE_SUCCESS,
        payload: data,
      });
    }
  } catch (err) {
    dispatch({
      type: PRODUCT_SAVE_FAIL,
      payload: err.message,
    });
  }
};
/*const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!product._id) {
      const { data } = await axios.post('/api/products', product, {
        headers: {
          Authorization: 'Bearer' + userInfo.token,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(
        '/api/products/' + product._id,
        product, 
        {
          headers: {
            Authorization: 'Bearer' + userInfo.token,
          },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};*/
//Delete product
/*{
  headers: {
    AUTHORIZATION: 'Bearer' + ' ' + userInfo.token,
  },*/
const deleteProduct = (productId) => async (dispatch) => {
  try {
    /*const {
      userSignin: { userInfo }, 
    } = getState();*/
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete('/api/products/' + productId);

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};
//Get details of product

export { listProducts, detailsProduct, saveProduct, deleteProduct,listMenproducts,listwomenproducts,listkidsproducts };
