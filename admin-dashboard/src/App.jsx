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
import { isUserLoggedIn } from './reducers/authReducer';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Product from './components/Products/Product';
import Orders from './components/Orders/Orders';
import Category from './components/Category/Category';
import { getAllCategories } from './reducers/categoryReducer';
import { getallProducts } from './reducers/productReducer';
import Page from './components/Page/Page';
import { getTopics } from './reducers/homePageReducer';

function App() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if(!auth.authenticate)
    {
      dispatch(isUserLoggedIn());
    }

    // fetching all the categories: if user is logged in
    if(auth.authenticate)
    {
      dispatch(getAllCategories());
      dispatch(getallProducts());
      dispatch(getTopics());
    }
  }, [auth.authenticate])
  
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/page' element={<Page />} /> 
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
