import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'; // Provider same as useContext hook here
import store from './store/store'; // importing store 

// creating a variable for window object so that you can use it in the browser:
window.store = store;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // from below store will be available to each component like useContext hook
  <Provider store={store}> 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
