import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userAction';
//import { setAlert } from '../actions/setAlert';
import Spinner from '../component/layout/Spinner';
const SigninScreen = (props) => {
  console.log(props);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const userSignin = useSelector((state) => state.userSignin);
  //const { loading, userInfo, error } = userSignin;
  const userData = useSelector((state) => state.userData);
  const { loading, user } = userData;
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  useEffect(() => {
    if (user) {
      props.history.push(redirect);
    }
    if (user && user.isAdmin) {
      props.history.push('products');
    }
    return () => {
      //
    };
  }, [user]);
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signin(email, password));
  };
  return (
    <div>
      {' '}
      {loading && (
        <div>
          <Spinner />
        </div>
      )}
      <div className='form'>
        <form onSubmit={submitHandler}>
          <ul className='form-container'>
            <li>
              <h2>Sign In</h2>
            </li>

            <li>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </li>
            <li>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </li>
            <li>
              <button type='submit' className='button primary'>
                Sign In
              </button>
            </li>
            <li>New to E-commerce?</li>
            <li>
              <Link
                to={
                  redirect === '/'
                    ? 'register'
                    : 'register?redirect=' + redirect
                }
                className='button secondary text-center'
              >
                {' '}
                Create your e-commerce account
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default SigninScreen;
