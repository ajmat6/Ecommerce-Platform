import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false,
    cartItems: { // object is used mainy to use key(123 -> id of product) as useful tool to determine if a product already exist in the cart or not
        // 123: {
        //     _id: 123,
        //     name: name,
        // }
    }
}


const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const cartItems = { ...state.cartItems }; // making o copy of the cartitems
            const product = action.payload; // argument you were passing while dispatching

            // if the product is already in the cart
            if (cartItems[product._id]) {
                cartItems[product._id].quantity += 1;
            }

            // if not in cart insert it
            else {
                cartItems[product._id] = { ...product, quantity: 1 };
            }

            localStorage.setItem('cart', JSON.stringify(cartItems));

            state.cartItems = cartItems
        },

        refreshAndGetCart: (state, action) => {
            // extracting cart details from the localstorage on refresh:
            const cart = localStorage.getItem('cart') ? 
                        JSON.parse(localStorage.getItem('cart')) : null 

            if(cart)
            {
                state.cartItems = cart;
            }
        }
    },
})

export default cartSlice.reducer;
export const { addToCart, refreshAndGetCart } = cartSlice.actions