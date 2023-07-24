import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authReducer' // importing reducers
// import signupReducer from '../reducers/signupReducer';

const store = configureStore({
    reducer: { // object of reducers -> acts like combineReducers of redux in redux toolkit
        auth: authReducer,
        // signupAuth: signupReducer
    }
})

export default store; // exporting store: