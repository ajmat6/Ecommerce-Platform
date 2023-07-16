import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers/reducer' // importing reducers

const store = configureStore({
    reducer: { // object of reducers -> acts like combineReducers of redux in redux toolkit
        rootReducer
    }
})

export default store; // exporting store: