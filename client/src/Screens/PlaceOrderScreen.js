import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../component/checkOutSteps';

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, payment } = cart;
  const userShipping = useSelector((state) => state.shipping);
  const { shipping } = userShipping;
  
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 40;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();
  const placeOrderhandler = () => {};
  if (!shipping) {
    props.history.push('/shipping');
  } else if (!payment.paymentMethod) {
    props.history.push('/payment');
  }

  useEffect(() => { 
    
//
  }, []);
  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className='placeorder'>
        <div className='placeorder-info'>
          <div>
            <h3>Shipping</h3>
            <div>

{shipping ? <div> {shipping.Address } {shipping.city} {shipping.postalCode} 
              {shipping.country}
</div>
              :

          {}
}
            </div>

          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method:{cart.payment.paymentMethod}</div>
          </div>
          <div>
            <ul className='cart-list-container'>
              <li>
                <h3>shopping Cart</h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item, index) => (
                  <li key={index}>
                    <div className='cart-image'> 
                      <img src={item.image} alt='product' />
                    </div>

                    <div className='cart-name'>
                      <div className="placeorder-item-name">
                        <Link to={'/product/' + item._id}>{item.name}</Link>
                      </div>
                      <div>Qty:{item.qty}</div>
                      <div>Size:{item.Size}</div>
                    </div>
                    <div className='cart-price'>
                      {' '}
                      <span>&#8377;</span>
                      {item.price}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className='placeorder-action'>
          <ul>
            <li>
              <button
                className='button primary full-width'
                onClick={placeOrderhandler}
              >
                Place Order
              </button>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>
                {' '}
                <span>&#8377;</span>
                {itemsPrice}
              </div>
            </li>
            <li>
              <div>Shipping</div>
              <div>
                {' '}
                <span>&#8377;</span>
                {shippingPrice}
              </div>
            </li>
            <li>
              <div>Tax
              </div>
              <div>
                {' '}
                <span>&#8377;</span>
                {Math.ceil(taxPrice)}
              </div>
            </li>
            <li>
              <div>Order Total</div>
              <div>
                {' '}
                <span>&#8377;</span>
                {totalPrice}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
