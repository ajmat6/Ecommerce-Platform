import './App.css';
import react, {useEffect} from 'react'
import HomePage from './components/HomePage/HomePage';
import {
  BrowserRouter,
  Routes, 
  Route,
} from 'react-router-dom'
import ProductListPage from './components/ProductListPage/ProductListPage';
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from './reducers/userAuthReducer';
import ProductDetails from './components/productDetailspage/ProductDetails';
import CartPage from './components/Cart/CartPage';
import { refreshAndGetCart, updateCart } from './reducers/cartReducer';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import OrderDetails from './components/OrderDetails/OrderDetails';
import MyProfile from './components/MyProfile/MyProfile';

function App(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, [])

  useEffect(() => {
    dispatch(refreshAndGetCart());
  }, [])

  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate])

  return (
    <div className="App">
      {/* <BrowserRouter> */}
        <Routes>
          <Route path='/' exact element={<HomePage />}/>
          <Route path='/cart'  element={<CartPage />}/>
          <Route path='/checkout' element={<Checkout />}/>
          <Route path='/account' element={<MyProfile />}/>
          <Route path='/account/orders' element={<Orders />}/>
          <Route path='/orderDetails/:order_id' element={<OrderDetails />}/>
          <Route path='/:productSlug/:productId/p' element={<ProductDetails />}/>
          <Route path='/:slug' element={<ProductListPage />}/>
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
