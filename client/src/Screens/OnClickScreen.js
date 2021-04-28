import React from 'react'
import {Link} from 'react-router-dom'
function OnClickScreen({toggle}) {
   
    return (
        <div className="onclick-div" style={ { display: toggle ? 'block' : 'none' } }   >
  <div className="navi-visible">
    
       <Link to="/shop/men">  <span className="pull-left">Men</span>
       </Link> 
</div>
<div className="navi-visible">
<Link to="/shop/women">
          <span className="pull-left">Women </span>
       </Link>
</div>
<div className="navi-visible">
<Link to="/shop/kids">
          <span className="pull-left">kids</span>
       </Link>
</div>

</div>
      
    














    )
}

export default OnClickScreen
