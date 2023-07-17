import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authReducer' // importing reducers

const store = configureStore({
    reducer: { // object of reducers -> acts like combineReducers of redux in redux toolkit
        auth: authReducer
    }
})

export default store; // exporting store: