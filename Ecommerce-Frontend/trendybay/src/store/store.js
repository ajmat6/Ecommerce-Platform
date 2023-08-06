import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../reducers/categoryReducer'

const store = configureStore({
    reducer: { // object of reducers -> acts like combineReducers of redux in redux toolkit
        category: categoryReducer,
    }
})

export default store; // exporting store: