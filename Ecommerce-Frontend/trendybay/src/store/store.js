import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../reducers/categoryReducer'
import productBySlugReducer from '../reducers/productBySlugReducer';

const store = configureStore({
    reducer: { // object of reducers -> acts like combineReducers of redux in redux toolkit
        category: categoryReducer,
        productBySlug: productBySlugReducer
    }
})

export default store; // exporting store: