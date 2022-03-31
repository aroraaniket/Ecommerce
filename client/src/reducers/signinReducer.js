import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
} from '../constants/userConstant';

const intialState = {
  token: localStorage.getItem('token'),
  loading: false,
  isAuthenticated: null,
  user: null,
  error: null,
};
function userReducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state, 
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case USER_SIGNIN_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case USER_SIGNIN_SUCCESS:
    case USER_REGISTER_SUCCESS: {
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    }
    case USER_REGISTER_FAIL:
    case AUTH_ERROR:
    case USER_SIGNIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        error: payload,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
export { userReducer };

/*const intialState = {
  token: localStorage.getItem('token'),
  loading: true,
  isAuthenticated: null,
  user: null,
};

function loadUSerReducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}

function userSigninReducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_SIGNIN_REQUEST:
      return {
        loading: true,
      };
    case USER_SIGNIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        loading: false,
        userInfo: payload.token,
      };
    case USER_SIGNIN_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
function userRegisterReducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: false,
      };
    case USER_REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        loading: false,
        userInfo: payload,
      };
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
function logoutreducer(state = intialState, action) {
  const { type, payload } = action;
  localStorage.removeItem('token');
  switch (type) {
    case LOGOUT:
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
 } */
