import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePayment } from '../actions/cartAction';
//import { getBraintreeToken } from '../actions/brainTreeAction';
import CheckoutSteps from '../component/checkOutSteps';
import { loadShipping } from '../actions/shipping';
//import DropIn from 'braintree-web-drop-in-react';

const PaymentScreen = (props) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  // const userData = useSelector((state) => state.userData);
  //const { user } = userData;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  };
  /* const brainTree = useSelector((state) => state.brainTree);
  const { brainTreeInfo, Instance, error } = brainTree;

 

  const userId = userInfo && userInfo._id;
  const token = userInfo && userInfo.token;
  
  

 
 /* const checkout = () => {
    let nonce;
    let getNonce = brainTree.Instance.requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;
        console.log('send nonce and total to process:', nonce);
      })
      .catch((error) => {
        console.log('Dropin error', error);
      });
  };
  /*const showDropIn = () => (
    <div>
      {brainTreeInfo.clientToken !== null ? (
        <div>
          <DropIn
            options={{
              authorization: brainTreeInfo.clientToken,
            }}
            onInstance={(instance) => (Instance = instance)}
          />
          <button onClick={checkout} className='button primary'>
            Checkout
          </button>
        </div>
      ) : null}
    </div>
  );*/

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className='form'>
        <form onSubmit={submitHandler}>
          <ul className='form-container'>
            <li>
              <h2>Payment</h2>
            </li>
            <li>
              <div>
                <input
                  type='radio'
                  name='paymentMethod'
                  id='paymentMethod'
                  value='paypal'
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor='paymentMethod'>Paypal</label>
              </div>
            </li>

            <li>
              <button type='submit' className='button primary'>
                Continue
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
