import { configureStore } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer' // importing 
import productReducer from '../reducers/productReducer'
import orderReducer from '../reducers/orderReducer'
import categoryReducer from '../reducers/categoryReducer'
import pageReducer from '../reducers/pageReducer'

const store = configureStore({
    reducer: { // object of reducers -> acts like combineReducers of redux in redux toolkit
        auth: authReducer,
        product: productReducer,
        order: orderReducer,
        category: categoryReducer,
        page: pageReducer
    },

    // to solve non-serializable error in console
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store; // exporting store: