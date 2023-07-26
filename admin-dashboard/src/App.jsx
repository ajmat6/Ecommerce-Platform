// import './App.css';
import {
  Routes,
  Route,
  useNavigate,
  BrowserRouter
} from 'react-router-dom'
import Home from './components/Home/Home';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './HOC/PrivateRoute';
import { isUserLoggedIn } from './reducers/authReducer';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Product from './components/Products/Product';
import Orders from './components/Orders/Orders';
import Layout from './components/Layout/Layout';
import Category from './components/Category/Category';
// import PrivateRoute from './HOC/PrivateRoute';

function App() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if(!auth.authenticate)
    {
      dispatch(isUserLoggedIn());
    }
  }, [])
  
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/products' element={<Product />} /> 
          <Route path='/orders' element={<Orders />} /> 
          <Route path='/category' element={<Category />} /> 
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
    </div>
  );
}

export default App;
