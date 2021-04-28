import React, { useEffect } from 'react';
import { addToCart } from '../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../actions/cartAction';
import { combineReducers } from 'redux';
import { saveProduct } from '../actions/Product';

const CartScreen = (props) => {
  console.log(props);
  const userData = useSelector((state) => state.userData);
  const { user } = userData;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //const userData = useSelector((state) => state.userData);
  // const { isAuthenticated, user } = userData;
  //const productId = props.match.params.id;
  /*const qty = props.location.search 
    ? Number(props.location.search.split('=')[1].substring(0,1))
    : 1; 

    const Size = props.location.search
    ? String(props.location.search.split('=')[2])
    : '0';*/

console.log(cartItems);

  const dispatch = useDispatch();
  const removeFromCartHandler = async (item) => {
    console.log(item);
    item.Cart=false;
await dispatch(saveProduct(item));
  await dispatch(removeFromCart(item._id));
  };
  //console.log(Size);
  //const us = useSelector((state) => state.us);
  /*useEffect(() => {
    /* if (!isAuthenticated) {
      props.history.push('/signin');
    }
    if (productId) {
      dispatch(addToCart(productId, qty,Size));
    }
  }, []);*/
  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
  <div>

  
  
  
  {user ? ( cartItems.length === 0)  ?( 
      <div className="wishlistEmpty-container">
        
            <div class="wishlistEmpty-heading">YOUR CART IS EMPTY</div>
           
   
            <div class="wishlistEmpty-info">
                Thereis othing in your bag.Let's add some items.
                </div>
                <div className="myntraweb-sprite wishlistLogin-icon sprites-emptyIcon">
                              <img  className="wishlist-image "src="https://i.pinimg.com/originals/95/3d/b3/953db3147cc28220fcca86e94c34b323.png"
                              alt="">
                              </img>
                              </div>
                              <div><a href="/wishlist" class="wishlistEmpty-button">ADD ITEMS FROM WISHLIST</a></div>
           
           </div>
          
          
        
          
            ) : (  
              
              
              <div className='cart'>
              <div className='cart-list'>
              <ul className='cart-list-container'>
          <li>
            <h3>shopping Cart</h3>
            <div>Price</div>
          </li> 
           { cartItems.map((item, index) => (
              <li key={item._id}>
                <div className='cart-image'>
                  <img src={item.image} alt='product' />
                </div>

                <div className='cart-name'>
                  <div>
                    <Link to={'/product/' + item._id}>{item.name}</Link>
                  </div>

                  <div className="qty">
                    Qty:
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item._id, Number(e.target.value),item.Size)
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
<div className="size"> 
                  Size: { item.Size}
                  </div>
                    <button
                      type='button'
                      className='button'
                      onClick={() => removeFromCartHandler(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className='cart-price'>{item.price}</div>
              </li>
                  ))}
              </ul>
                    
              </div>
      
      <div className='cart-action'>
        <h3>
          Subtotal(
          {cartItems.reduce((a, c) => {
            return Number(a) + Number(c.qty);
          }, 0)}{' '}
          items) : <span>&#8377;</span>
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button
          onClick={checkoutHandler}
          className='button primary full-width'
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
     
           )
           </div>
           
          
     ): (<div>
      <div className="wishlistLogin-container">
                       <div className="wishlistLogin-heading">PLEASE LOG IN</div>
                       <div className="wishlistLogin-info">Login to view items in Bag.</div>
                       <div className="myntraweb-sprite wishlistLogin-icon sprites-emptyIcon">
                           <img  className="wishlist-image "  src="https://i.pinimg.com/originals/95/3d/b3/953db3147cc28220fcca86e94c34b323.png"
                           alt=""
                           >
                           </img>
                           </div>
                       <div>
                           <Link to="/signin" className="wishlistLogin-button">LOGIN</Link>
                           </div>
                           </div>
                           </div>
                          
                           )
  
   
                          
     }
   
   
    </div>

  );
};

export default CartScreen;
