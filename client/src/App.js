import React, { useEffects } from 'react';
import './component/Fontawesomeicon';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/Registerscreen';
import ProductsScreen from './Screens/ProductsScreen';
import ShippingScreen from './Screens/ShippingSceen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import Alert from './component/layout/alert';
import NavbarScreen from './Screens/NavbarScreen';
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './actions/userAction';
import setAuthToken from './tokenSetter/SetAuthToken';
import { useEffect } from 'react';
import SearchScreen from './Screens/SearchScreen';
import WishlistScreen from './Screens/WishlistScreen';
import LinkMenScreen from './Screens/LinkMenScreen';
import FooterScreen from './Screens/footerScreen';
import LinkWomenScreen from './Screens/LinkWomenScreen';
import LinkKidsScreen from './Screens/LinkkidsScreen';
import Front from './Front/Front';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        
        <div className='grid-container'>
        <Route path='/' component={NavbarScreen}></Route>
      
          <main className="main">
          <Alert />
            <div className='content'>
          
        
  
              <Route path='/products' component={ProductsScreen}></Route>
              <Route path='/shipping' component={ShippingScreen}></Route>
              <Route path='/payment' component={PaymentScreen}></Route>
              <Route path='/placeorder' component={PlaceOrderScreen}></Route>
              <Route path='/signin' component={SigninScreen}></Route>
              <Route path='/register' component={RegisterScreen}></Route>
              <Route path='/wishlist' component={WishlistScreen}></Route>
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/' exact component={HomeScreen} /> 
              <Route path='/search/' component={SearchScreen} />
              <Route exact path='/shop/men' component={LinkMenScreen} />
              <Route exact path='/shop/women' component={LinkWomenScreen} />
              <Route exact path='/shop/kids' component={LinkKidsScreen} />
              
            </div>
         
          </main>
        <div className="footer">
         <FooterScreen />
          
         </div>
        </div>
     
      </Router>
    </Provider>
  );
}

export default App;
