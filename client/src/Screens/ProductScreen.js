import React, { useEffect, useState ,useRef,useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct, saveProduct } from '../actions/Product';
import Spinner from '../component/layout/Spinner';
import { setAlert } from '../actions/setAlert';
import { addToCart } from '../actions/cartAction';

const ProductScreen = (props) => { 
  console.log(props);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('S');
  const productDetail = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetail;

  const userData = useSelector((state) => state.userData);
  const { user } = userData;

  
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
   
    }, []);
  

    //console.log(product.Size);


  const [isSending,setIsSending]=useState(false);

  const isMounted = useRef(true);
  const dispatch = useDispatch();
  useEffect(() => {
  
    return () => {
      isMounted.current = false
    }
  }, []) 
console.log(qty);
console.log(size);


  /*const handleAddToCart =async (e) => {
    //props.history.push('/cart/' + props.match.params.id + '?qty=' + qty+ '?size=' +size);

if(user){
e.preventDefault();

product.Cart=true;
 await dispatch(saveProduct(product));


dispatch(addToCart(product._id, qty,size,user))
dispatch(setAlert("product added in cart", 'success'));

}else{
props.history.push('/signin');
} 



    /* props.history.push(
      '/signin?redirect=cart/' + props.match.params.id + '?qty=' + qty
    );
  };
*/
  const sendRequest = useCallback( async (product,qty,size) =>{
    if(user){
// don't send again while we are sending 
      if (isSending) return
    // update state
    // send the actual request
    setIsSending(true)
      product.Cart=true;
     await dispatch(saveProduct(product));

console.log(qty+" "+size);
    await  dispatch(addToCart(product._id,qty,size,user));
   
     dispatch(setAlert("product added in cart", 'success'));
   
  }else{ 
   props.history.push('/signin');
   }

// once the request is sent, update state again
   if (isMounted.current) // only update if we are still mounted
      setIsSending(false)

  },[isSending])// update the callback if the state changes



 





  
  

  
 



  







  
  //







  return (
    <div>
      <div className='back-to-result'>
        <Link style={{textDecoration:"none"}} to='/'>Back to results</Link>
      </div> 
      {loading ? (
        <div>
          {' '}
          <Spinner />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='details'>
          <div className='details-image'>
            <img src={product.image} alt='product'></img>
          </div>
          <div className='details-info'>
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} Stars ({product.numReview} reviews)
              </li>
              <li>
                Price:<span>&#8377;</span> <b>{product.price}</b>
              </li>
              <li>
                Descriptions:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className='details-action'>
            <ul>
              <li>
                Price:<span>&#8377;</span>
                {product.price}
              </li>
              <li>
                Status:{product.countInStock > 0 ? 'In stock' : 'Unavailable'}
              </li>
              <li>
                Qty:
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>


           
              
           <li>


  Size:
  <select
                  value={size}
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                >
  
  
  {product.Size ? product.Size.split(',').map((x)=>( 
 <option key={x } value={x }>
 {x }
</option>



  )) :0 }
             

             </select>

           </li>
        
             

                 
                {product.countInStock > 0 && (
                  <div>
                  <button   type="button"  style={{width:"300px"}}  
                   disabled={isSending}   
                    onClick={()=>sendRequest(product,qty,size)} className= {product.Cart===false ? 'button primary' :"not-display"}>
                  {  product.Cart===false && <div> Add To Cart</div> 
                }


                  </button>
                  <button  style={{width:"300px"}} className={ product.Cart===true ?"button added" :"not-display"}>
                 {  product.Cart===true &&    <Link to="/cart"> GO TO CART</Link>  }
                 </button>
                  </div>
                 
                )}
             
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
