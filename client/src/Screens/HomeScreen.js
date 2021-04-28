import React, { useEffect, useState,useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { listProducts, saveProduct } from '../actions/Product';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../component/layout/Spinner';
//import { Carousel } from 'react-responsive-carousel';
//import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import {addToWishlist} from '../actions/whishlist'

const HomeScreen = (props) => {


  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

 
const [isSending,setIsSending]=useState(false);
const isMounted = useRef(true);
  const userData = useSelector((state) => state.userData); 
  const { user } = userData;

  const dispatch = useDispatch();

  useEffect(() => { 
  
    return () => {
      isMounted.current = false
    }
  }, [])
  const sendRequest = useCallback( async (product) =>{
    if(user){
// don't send again while we are sending 
      if (isSending) return
    // update state
    // send the actual request
    setIsSending(true)
      product.Wishlist=true;
     await dispatch(saveProduct(product));


    await  dispatch(addToWishlist(product._id,user));
   
     
   
  }else{ 
   props.history.push('/signin');
   }

// once the request is sent, update state again
   if (isMounted.current) // only update if we are still mounted
      setIsSending(false)

  },[isSending])// update the callback if the state changes





  

  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    };
  }, []);
  return loading ? (
    <div>
      <Spinner />
    </div> //need to add spinner here
  ) : error ? (
    <div>{error}</div>
  ) : ( 
   
    <div >
      <ul className='products'>
   
        {products.map((product) => (
           
          <li className="products-li"  key={product._id}>
       
        
              <Link   to={'/product/' + product._id}>
             
           <img
            
           className='product-image' 
             src={product.image}
             alt='product' 
      /> 
      
    
  
</Link>

<div className="hover-div">
  <button type="button" className={(product.Wishlist===false  || !user)? "button-hover" :"button-wishlist"} 
  disabled={isSending} onClick={()=>sendRequest(product)}
  //onClick={async ()=> await clickHandler( product)} 
   >
 
  {/*<FontAwesomeIcon style={{marginRight:"6px" ,marginTop:"4px"}} icon='heart' viewBox="0 0 550 550"  fill='white' />
*/}
 <i style={{marginRight:"6px" ,marginTop:"4px" ,fontSize:"1.5rem"}}   className="fa fa-heart red-color  " aria-hidden="true"></i>
  {(product.Wishlist===false || !user) ? "WISHLIST" : "WISHLISTED"}
   


  </button>

</div>
  <div  id='product-ddd'>
              <div  style={{marginBottom:"3px",marginTop:"3px"}}>
                <Link className='product-name' to={'/product/' + product._id}>{product.brand}</Link>
              </div>
              <div className='product-description'>{product.description}</div>
              <div className='product-price'>
                Rs.
                {product.price}
              </div>
            
            </div>
          
          </li>
         
        ))}
       
      </ul>
    </div>
 
  );
};

export default HomeScreen;