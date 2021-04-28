 import {Wishlist_ADD_ITEM,
     Wishlist_REMOVE_ITEM
} from '../constants/whistlistconstant' 

const InitialState={ 
 
    wishlistItems:[],
   
   
}
 
function wishlistReducer( state = { wishlistItems: [],wishlistUser:{}},
  action){
    const { type, payload } = action;
    switch(type){

case Wishlist_ADD_ITEM: 
    const item=payload;
  const  wishlistUser= payload.user;
  
    const product = state.wishlistItems.find((x) => x._id === item._id);
    if (product) {
      return {
        wishlistItems: state.wishlistItems.map((x) =>
          x._id === product._id ? item : x 
        ),
       
       
    
      
      };
    }
    return { wishlistItems: [...state.wishlistItems, item],wishlistUser};

    case Wishlist_REMOVE_ITEM:
        return {
         wishlistItems: state.wishlistItems.filter((x) => x._id !== payload),
        };

        default:
            return state;
        



    }


}
export {wishlistReducer}