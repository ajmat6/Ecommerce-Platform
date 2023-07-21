import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Home from './components/Home/Home';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar'
// import PrivateRoute from './HOC/PrivateRoute';

function App() {
  return (
    <div className="App">
      {/* Routing using react-router-dom */}
      <BrowserRouter>
        <Navbar />
        {/* Home component will be private and will be different for each of the user and the admin */}
        {/* Passing path and element as props to the PrivateRoute component */}
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
