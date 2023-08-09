import './App.css';
import HomePage from './components/HomePage/HomePage';
import {
  BrowserRouter,
  Routes, 
  Route,
} from 'react-router-dom'
import ProductListPage from './components/ProductListPage/ProductListPage';
import Navbar from './components/Navbar/Navbar';

function App(props) {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
        <Routes>
          <Route path='/' exact element={<HomePage />}/>
          <Route path='/*' element={<ProductListPage />}/>
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
