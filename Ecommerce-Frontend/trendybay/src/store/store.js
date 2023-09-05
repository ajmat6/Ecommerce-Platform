import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../reducers/categoryReducer'
import productBySlugReducer from '../reducers/productBySlugReducer';
import getPageReducer from '../reducers/getPageReducer';

const store = configureStore({
    reducer: { // object of reducers -> acts like combineReducers of redux in redux toolkit
        category: categoryReducer,
        productBySlug: productBySlugReducer,
        getProductPage: getPageReducer
    }
})

export default store; // exporting store: