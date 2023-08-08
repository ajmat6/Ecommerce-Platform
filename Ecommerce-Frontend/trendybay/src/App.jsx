import './App.css';
import HomePage from './components/HomePage/HomePage';
import {
  BrowserRouter,
  Routes, 
  Route,
  // useHistory
} from 'react-router-dom'
import ProductListPage from './components/ProductListPage/ProductListPage';
import Navbar from './components/Navbar/Navbar';

function App(props) {
  // const history = useHistory();

  // const pushHistory = (slug) => history.push(slug)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<HomePage />}/>
          <Route path='/:slug' element={<ProductListPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
