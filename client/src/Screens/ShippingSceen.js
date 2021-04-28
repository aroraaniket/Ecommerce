import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShipping, loadShipping } from '../actions/shipping';
import Spinner from '../component/layout/Spinner';
import CheckoutSteps from '../component/checkOutSteps';

const ShippingScreen = (props) => {
  const [Address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [Country, setCountry] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const userShipping = useSelector((state) => state.shipping);
  const { shipping } = userShipping;
  const openModal = (shipping) => {
    // console.log(shipping);
    //console.log(shipping.Address);
    setModalVisible(true);
    setAddress(shipping.Address);
    setCity(shipping.city);
    setCountry(shipping.Country);
    setPostalCode(shipping.postalCode);
  };
  /* useEffect(() => {
    if (shipping) {
      props.history.push('/payment');
    }
    return () => { 
      //
    };
  }, []);
*/
  console.log(modalVisible);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loadShipping());
    dispatch(saveShipping(Address, city, postalCode, Country));
   
    // dispatch(userShipping({ address, city, postalCode, country }));
    props.history.push('payment');
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>

      {!shipping ?  <Spinner /> : (shipping && !modalVisible )? (
        
        <div className='shipping-Address'>
          <h4>Address:{shipping.Address}</h4>
          <h4>city:{shipping.city}</h4>
          <h4>postalCode:{shipping.postalCode}</h4>
          <h4>country:{shipping.Country}</h4>
      
          <div>
            <li>
              <button
                type='submit'
                onClick={(e) => props.history.push('payment')}
                className='button primary shipping-button'
              >
                Continue
              </button>

              <button
                type='button'
                onClick={() => openModal(shipping)} 
                className='button primary shipping-button'
              >
                Update
              </button>
            </li>
          </div>
        </div>
      ) : (
        <div className='form'>
          <form onSubmit={submitHandler}>
            <ul className='form-container'>
              <li>
                <h2>Shipping</h2>
              </li>
              <li>
                <label htmlFor='address'>Address</label>
                <input
                  type='text'
                  name='address'
                  id='address'
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='city'>City</label>
                <input
                  type='text'
                  name='city'
                  id='city'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='postalCode'>Postal Code</label>
                <input
                  type='text'
                  name='postalCode'
                  id='postalCode'
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </li>
              <li>
                <label htmlFor='country'>Country</label>
                <input
                  type='text'
                  name='country'
                  id='country'
                  value={Country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </li>
              <li>
                <button type='submit' className='button primary'>
                  Continue
                </button>
              </li>
            </ul>
          </form>
        </div>

      )
      }

    </div>
  );
};

export default ShippingScreen;
