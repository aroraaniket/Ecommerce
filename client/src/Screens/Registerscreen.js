import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userAction';
import { setAlert } from '../actions/setAlert';
//import Spinner from '../component/layout/Spinner';

const RegisterScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userData = useSelector((state) => state.userData);
  const { user, error } = userData;
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  useEffect(() => {
    if (user) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      dispatch(setAlert('password do not match', 'danger'));
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <div className='form'>
      <form onSubmit={submitHandler}>
        <ul className='form-container'>
          <li>
            <h2>Create Account</h2>
          </li>
          <li>
            <div className='text-danger'>
              {error &&
                error.map(
                  (e, index) =>
                    e.context.label === 'exist' && (
                      <p key={index}>{e.message}</p>
                    )
                )}
            </div>
          </li>
          <li>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </li>
          <div className='text-danger'>
            {error &&
              error.map(
                (e, index) =>
                  e.context.label === 'name' && <p key={index}>{e.message}</p>
              )}
          </div>
          <li>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </li>

          <li className='text-danger'> 
            {error &&
              error.map(
                (e, index) =>
                  e.context.label === 'email' && <p key={index}>{e.message}</p>
              )}
          </li>

          <li>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </li>
          <li className='text-danger'>
            {error &&
              error.map(
                (e, index) =>
                  e.context.label === 'password' && (
                    <p style={{display:"inline-block"}} key={index}>{e.message} </p>
                  )
              )}
          </li>
          <li>
            <label htmlFor='repassword'>Confirm Password</label>
            <input
              type='password'
              name='repassword'
              id='repassword'
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
          </li>
          <li>
            <button type='submit' className='button primary'>
              Register
            </button>
          </li>
          <li>
            Already have an account?{' '}
            <Link
              to={redirect === '/' ? 'signin' : 'signin?redirect=' + redirect}
              className='button secondary text-center'
            >
              Sign In
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default RegisterScreen;
