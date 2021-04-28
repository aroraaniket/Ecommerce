import React,{useState,  useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../component/layout/Spinner'

 import {addToCart} from '../actions/cartAction'
 import {removeFromWishlist} from '../actions/whishlist'
import { saveProduct } from '../actions/Product'
 import { setAlert } from '../actions/setAlert';

function WishlistScreen() { 

const [modalVisible , setModalVisible]=useState(false); 
const [qty , setqty]=useState(1);
const [size , setSize]=useState('S');
const [img, setImg]=useState('');
const [desp,setdesp]=useState('');
const [price,setPrice]=useState('');
const[finalqty,setFinalqty]=useState('1');
const [PRODUCT,SETPRODUCT]=useState({});
const [Id,setId]=useState('');
const[sizeAvailable,setSizeAvalaible]=useState('');
    const userData = useSelector((state) => state.userData);
  const { user } = userData;

  const userWishlist= useSelector((state) => state.wishlist);
  const { wishlistItems,wishlistuser } = userWishlist; 
  //console.log(userWishlist);
  //console.log(wishlistItems);
  
  const dispatch = useDispatch();
 const openModal=(product)=>{
   // dispatch(addToCart(productId, qty,Size)); 
setModalVisible(true);
console.log(product);
setImg(product.image);
setdesp(product.description);
setPrice(product.price); 
setqty(product.countInStock); 
//dispatch(removeFromWishlist(productId));
SETPRODUCT(product);
setId(product._id);  
setSizeAvalaible(product.Size);

 }
 
const handleClick=(result)=>{
  //console.log(result);
  result.Wishlist=false;
dispatch(saveProduct(result));
dispatch(removeFromWishlist(result._id))



} 

const handleRemoveClick=()=>{

  
setModalVisible(false);

}


const submitHandler=async ()=>{
  // console.log(finalqty);
   //console.log(size);
   PRODUCT.Wishlist=false;
  await dispatch(saveProduct(PRODUCT));
   dispatch(addToCart(Id, finalqty,size,user));
dispatch(setAlert("product added in cart", 'success'));
dispatch(removeFromWishlist(Id));

setModalVisible(false);
  
}

 
  
    return ( 
       <div id="mountRoot" style={{minHeight:"750px" ,marginTop:"2px"}}>
          
               <div >


               {  modalVisible &&<div className="Modal-modalContent">
    <div className="Modal-modalDialog">
      
    <div class="sizeselect-sizeDisplayDiv sizeselect-showSizeDisplayDiv">
        <div class="sizeselect-productInfo">
    <img src={img}
    width="100px"
    height="100px"
    >
       </img> 
        <div> 
            <div style={{fontWeight: "500"}}>
                </div>
                <div class="sizeselect-name">
                    {desp}</div>
                    <div style={{fontSize: "16px"}}><span class="PriceInfo-price" >
                        <strong> ₹ {price}</strong>
                        </span>
                        <span class="PriceInfo-mrp"><s>
                    </s>
                    </span>
                    </div></div>
                        </div>

                        <div  style={{marginTop:"100px"}}   class="itemcard-removeIcon" onClick={()=>handleRemoveClick()} >
                    
                    <i className="fa fa-times  myntraweb-sprite itemcard-removeMark sprites-remove " aria-hidden="true"></i>
                    </div>
                 

                        <div class="sizeselect-sizeDisplayHeader">
                            <span class="sizeselect-sizeSelectLabel">
                                Select Size :    <select
                  value={size}
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                >
  
  
  {sizeAvailable ? sizeAvailable.split(',').map((x)=>(
 <option key={x } value={x }>
 {x }
</option> //


 
  )) :0 }
             

             </select>

                                





                                </span>
                                <span class="myntraweb-sprite sizeselect-sizeDisplayRemoveMark sprites-remove">
                                    </span>
                                    </div>
                                    <div  style={{paddingLeft:"0"}}  class=" sizeselect-sizeDisplayHeader sizeselect-sizeButtonsContaier">
                                       
                                   Select Qty    :
                                   <select
                                   style={{marginLeft:"10px"}}
                  value={finalqty}
                  onChange={(e) => {
                    setFinalqty(e.target.value);
                  }}
                >
                  {[...Array(qty).keys()].map((x) => (
                    <option key={x + 1} value={x+1 }>
                      {x+1 }
                    </option>
                  ))}
                </select>
                                   
                        
                            
                                                            </div>
                                                    <div class="sizeselect-done">
                                                        <button class="wishlist-sizeButton" type="submit" onClick={()=>submitHandler()}  >
                                                        Done
                                                        </button>
                                                       </div>
                                                    </div>
                                                  
                                                    </div>
                                                       </div>                                         
                                                    }


















                   <div className="application-base">

        {user ? ( wishlistItems.length===0 ? (
    <div className="wishlistEmpty-container">
        
         <div class="wishlistEmpty-heading">YOUR WISHLIST IS EMPTY</div>
        

         <div class="wishlistEmpty-info">
             Add items that you like to your wishlist. Review them anytime and easily move them to the bag.
             </div>
             <div className="myntraweb-sprite wishlistLogin-icon sprites-emptyIcon">
                           <img    className="wishlist-image "  src="https://img.icons8.com/ios/452/wish-list.png">
                           </img>
                           </div>
                           <div><a href="/" class="wishlistEmpty-button">CONTINUE SHOPPING</a></div>
        
        </div>
):(



    <div id="item1" >
    <ul className="link-ul">
{   wishlistItems.map((result)=>(


<div  className="link-div itemcard-itemCard " key={result._id}>  


    <Link to={'/product/' + result._id} >
        
                <img class="itemcard-itemImage" src={result.image} >
                    </img>
                 
                    </Link>

                    <div class="itemcard-removeIcon" onClick={()=>handleClick(result)} >
                    
                        <i className="fa fa-times  myntraweb-sprite itemcard-removeMark sprites-remove " aria-hidden="true"></i>
                        </div>
                     


 <div class="itemcard-itemActions">
                        <div class="itemdetails-itemDetails">
                        <p class="itemdetails-itemDetailsLabel">{result.description}</p>
                        <p class="itemdetails-itemDetailsDescription">

                        </p>
                       

                                       <div class="itemdetails-itemPricing">
                            <span class="itemdetails-boldFont">
                                Rs.{result.price}
                           </span>
                         
                          </div>
                          </div>
                          <div class="itemcard-actionDiv">
                              <span class="itemcard-flex undefined">
                                  <button  onClick={()=>openModal(result)} class="itemcard-moveToBag itemcard-boldFont" >
                                      MOVE TO BAG</button>
                        </span>
    </div>
    </div>
    

</div>
))}    
 </ul>
 </div>

)


):(



<div><div className="wishlistLogin-container">
                       <div className="wishlistLogin-heading">PLEASE LOG IN</div>
                       <div className="wishlistLogin-info">Login to view items in your wishlist.</div>
                       <div className="myntraweb-sprite wishlistLogin-icon sprites-emptyIcon">
                           <img  className="wishlist-image "  src="https://img.icons8.com/ios/452/wish-list.png">
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
</div>

</div>

    
       
    )






}

export default WishlistScreen
