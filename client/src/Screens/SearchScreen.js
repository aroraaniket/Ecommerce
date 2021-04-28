import React ,{Fragment,useEffect, useState}from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
function SearchScreen(props) {
console.log(props);


    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;

  
    const value= props.location.pathname
    ? String(props.location.pathname.substring(8))
    : null;

    const results =products.filter(product=>(product.category===value));

    const[searchresult,setSearchresult]= useState(results)
   


   
  useEffect(() => {
    const received=localStorage.getItem('document');
    if(received){
      setSearchresult(JSON.parse(received));
    }
    return()=>{
localStorage.removeItem('document');
    }
    
  }, [])
 
 

useEffect(() => {
 if(localStorage.getItem('document')==null){
  localStorage.setItem('document',JSON.stringify(results)); 
 }

});


 
  

 // setSearchresult(Initialsearch);




   

    
/*useEffect(() => {
 
 const data=localStorage.getItem("document");
 console.log(data);

 if(data){
   setSearchresult(JSON.parse(data));
 }
}, []);
*/




    return ( 
      <div >
       
{(  searchresult.length==0) ?(   
<div> 

<div className="wishlistEmpty-container">
        
         <div className="wishlistEmpty-heading">NOTHING FOUND</div>
        
             <div className="myntraweb-sprite wishlistLogin-icon sprites-emptyIcon">
                           <img    className="wishlist-image "  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtY1S-vUm6dOcIyPnp7TSm3Khi9mwjTV0pRw&usqp=CAU">
                           </img>
                           </div>
                           <div><a href="/" className="wishlistEmpty-button">CONTINUE SHOPPING</a></div>
        
        </div>

</div>

):  (  <ul className='products'> 
   
   {searchresult.map((result) =>(
   
      
     <li className="products-li"  key={result._id}>
  
   
         <Link   to={'/product/' + result._id}>
        
      <img
       
      className='product-image' 
        src={result.image}
        alt='product'
 />
 


</Link>

<div className="hover-div">
<button  className="button-hover">

{/*<FontAwesomeIcon style={{marginRight:"6px" ,marginTop:"4px"}} icon='heart' viewBox="0 0 550 550"  fill='white' />
*/}
<i style={{marginRight:"6px" ,marginTop:"4px" ,fontSize:"1.5rem"}}   className="fa fa-heart-o  " aria-hidden="true"></i>
Wishlist

</button>

</div>
<div  id='product-ddd'>
         <div  style={{marginBottom:"3px",marginTop:"3px"}}>
           <Link className='product-name' to={'/product/' + result._id}>{result.brand}</Link>
         </div>
         <div className='product-description'>{result.description}</div>
         <div className='product-price'>
           Rs.
           {result.price}
         </div>
       
       </div>
     
     </li>
    
))}
  
 </ul> 
   )
  }



    
     </div>
 

    )

    }
export default SearchScreen
