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
import { refreshAndGetCart } from './reducers/cartReducer';

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLoggedIn());
  }, [])

  useEffect(() => {
    dispatch(refreshAndGetCart());
  }, [])

  return (
    <div className="App">
      {/* <BrowserRouter> */}
        <Routes>
          <Route path='/' exact element={<HomePage />}/>
          <Route path='/cart' exact element={<CartPage />}/>
          <Route path='/:productSlug/:productId/p' element={<ProductDetails />}/>
          <Route path='/:slug' element={<ProductListPage />}/>
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
