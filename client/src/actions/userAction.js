import axios from 'axios';
import Cookie from 'js-cookie';
import { setAlert } from './setAlert';
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  // CLEAR_PROFILE,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from '../constants/userConstant';
//import { SET_ALERT } from '../constants/setAlertConstant';
import setAuthToken from '../tokenSetter/SetAuthToken';
import { loadShipping } from './shipping';

//load user
const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const { data } = await axios.get('/api/users');
    dispatch({
      type: USER_LOADED,
      payload: data,
    });
    dispatch(loadShipping());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Login user
const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    paylod: { email, password },
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const { data } = await axios.post('/api/users/signin', body, config);
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    dispatch(loadUser());
    dispatch(loadShipping());
    //  Cookie.set('userInfo', JSON.stringify(data));
    //Cookie.set('InitialState', JSON.stringify(data));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: errors,
    });
  }
};
//Register a new user
const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    paylod: { name, email, password },
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const { data } = await axios.post('/api/users/register', body, config);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch(loadUser());
    dispatch(loadShipping());
    // Cookie.set('userInfo', JSON.stringify(data));
  } catch (err) {
    const error = err.response.data.errors;

    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error,
    });
  }
};
const logout = () => (dispatch) => {
  Cookie.remove('userInfo');

  dispatch({ type: LOGOUT });
};

export { signin, register, logout, loadUser };
