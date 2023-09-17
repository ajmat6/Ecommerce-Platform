import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../reducers/categoryReducer'
import productBySlugReducer from '../reducers/productBySlugReducer';
import getPageReducer from '../reducers/getPageReducer';
import userAuthReducer from '../reducers/userAuthReducer';
import productDetailsReducer from '../reducers/productDetailsReducer';
import cartReducer from '../reducers/cartReducer';
import addressReducer from '../reducers/addressReducer';
import orderReducer from '../reducers/orderReducer';

const store = configureStore({
    reducer: {
        category: categoryReducer,
        productBySlug: productBySlugReducer,
        getProductPage: getPageReducer,
        auth: userAuthReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        address: addressReducer,
        orders: orderReducer
    }
})

export default store; // exporting store: