import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authReducer' // importing 
import productReducer from '../reducers/productReducer'
import orderReducer from '../reducers/orderReducer'
import categoryReducer from '../reducers/categoryReducer'

const store = configureStore({
    reducer: { // object of reducers -> acts like combineReducers of redux in redux toolkit
        auth: authReducer,
        product: productReducer,
        order: productReducer,
        category: categoryReducer,
    }
})

export default store; // exporting store: