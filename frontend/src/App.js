import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/Navbar/ScrollToTop';
import { Provider } from 'react-redux';
import store from './store/store'; 
import { useSelector } from 'react-redux';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Product from './pages/Product/Product';
import ProductSingle from './pages/ProductSingle/ProductSingle';
import Checkout from './pages/Checkout/Checkout'; 

import 'notyf/notyf.min.css'; // for React, Vue and Svelte




let persistor = persistStore(store);


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <div className="App">
          <Router>
              <ScrollToTop />
              <Navbar />
              <Routes>
                <Route  path='/' element={
                  <ProtectedRoute>
                      <Home />
                  </ProtectedRoute>                
                } />

                <Route path='/login'  element={
                  <GuestRoute>
                    <Login /> 
                  </GuestRoute>                 
                } />


                <Route path="/register" element={
                   <GuestRoute>
                      <Register />
                   </GuestRoute>                
                } />
                  
              <Route  path='/products'
                 element={<Product /> }
               />

              <Route  path='/products/:productId'
                 element={<ProductSingle /> }
               />

                <Route  path='/cart'
                 element={<Cart /> }
               />


              <Route  path='/order-checkout/:orderId' element={
                  <ProtectedRoute>
                      <Checkout />
                  </ProtectedRoute>                
                } />



              


              </Routes>  





              
          </Router>
      </div>
      </PersistGate>
    </Provider>
  );
}

export default App;



function ProtectedRoute({children}) { 
  const user = useSelector(state => state.user);
   

  if(user.isLoggedIn === false) {
    return <Navigate to="/login" replace />
  }

  return  children; 
}


function GuestRoute ({children}) { 
  const user = useSelector(state => state.user); 

  if(user.isLoggedIn){   
    return <Navigate to="/" replace />
  }

  return children; 
}