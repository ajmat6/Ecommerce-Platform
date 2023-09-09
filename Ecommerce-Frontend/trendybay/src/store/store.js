import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../reducers/categoryReducer'
import productBySlugReducer from '../reducers/productBySlugReducer';
import getPageReducer from '../reducers/getPageReducer';
import userAuthReducer from '../reducers/userAuthReducer';
import productDetailsReducer from '../reducers/productDetailsReducer';
import cartReducer from '../reducers/cartReducer';

const store = configureStore({
    reducer: {
        category: categoryReducer,
        productBySlug: productBySlugReducer,
        getProductPage: getPageReducer,
        auth: userAuthReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer
    }
})

export default store; // exporting store: