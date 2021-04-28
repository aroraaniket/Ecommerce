import React,{useState,useEffect,useCallback,useRef} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {addToWishlist} from '../actions/whishlist'
import { listMenproducts, saveProduct } from '../actions/Product'
import Spinner  from '../component/layout/Spinner'

function LinkMenScreen(props) {
 
   
    const [isSending,setIsSending]=useState(false);
const isMounted = useRef(true);
    const userData = useSelector((state) => state.userData); 
    const { user } = userData;

    const productList = useSelector((state) => state.productListMen);
  const { products, loading, error } = productList; 


    const dispatch = useDispatch();


  /*  const clickHandler= (product) =>{
     if(user){
       dispatch(addToWishlist(product._id,user));
       setwish('Wishlisted');
    
   }else{ 
    props.history.push('/signin');
  
  
  
  
  
   }
  
    }*/

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
      dispatch(listMenproducts());
      return () => {
        //
      };
    }, []); 






 
    return (loading ? (
      <div>
        <Spinner />
      </div> //need to add spinner here
    ) : error ? (
      <div>{error}</div>
    ) : ( 
        <div className="linkscreen-div"  >
        <ul className='linkscreen-products'>
     
          {products.map((product) => (
             
            <li className="products-linkscreen"  key={product._id}>
         
          
                <Link   to={'/product/' + product._id}>
               
             <img
              
             className='product-image' 
               src={product.image}
               alt='product' 
        /> 
        
      
    
  </Link>
  
  <div className="hover-div">
    <button type="button" className={(product.Wishlist===false  || !user)? "button-hover" :"button-wishlist"}
   disabled={isSending} onClick={()=>sendRequest(product)}>
   
    {/*<FontAwesomeIcon style={{marginRight:"6px" ,marginTop:"4px"}} icon='heart' viewBox="0 0 550 550"  fill='white' />
  */}
   <i style={{marginRight:"6px" ,marginTop:"4px" ,fontSize:"1.5rem"}}   className="fa fa-heart-o  " aria-hidden="true"></i>
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
   
        
    )
    );
}

export default LinkMenScreen
