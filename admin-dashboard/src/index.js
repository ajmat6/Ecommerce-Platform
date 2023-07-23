import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'; // Provider same as useContext hook here
import store from './store/store'; // importing store 
import { BrowserRouter } from 'react-router-dom';

// creating a variable for window object so that you can use it in the browser (can use like this: window.store and it will show all the methods of the store - dispatch, getState etc..):
window.store = store;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // from below store will be available to each component like useContext hook
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}> 
      <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
