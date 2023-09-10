import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";
import { useDispatch, useSelector } from "react-redux";

const dispatch = useDispatch();

const initialState = {
    loading: false,
    cartItems: { // object is used mainy to use key(123 -> id of product) as useful tool to determine if a product already exist in the cart or not
        // 123: {
        //     _id: 123,
        //     name: name,
        // }
    },
    updatingCart: false,
    error: null
}

// export const getCartItems = createAsyncThunk('getCartItems', async () => {
//     try {
//         const res = await axiosInstance.post('/user/cart/getCartItems');

//         if (res.status === 200) {
//             const { cartItems } = res.data;
//             console.log(cartItems);
//             return cartItems
//         }
//     }
//     catch (error) {
//         console.log(error);
//     }
// })

// export const addToCart = createAsyncThunk('getCartItems', async ({product, qty, logIn}) => {
//     // const cartItems = { ...state.cartItems }; // making o copy of the cartitems
//     // const { product, qty, logIn } = action.payload; // argument you were passing while dispatching (two arguments are there)

//     // if user is logged in:
//     if (logIn)
//     {
//         // if the product is already in the cart
//         if (cartItems[product._id]) {
//             cartItems[product._id].quantity += qty;
//         }
    
//         // if not in cart insert it
//         else {
//             cartItems[product._id] = { ...product, quantity: 1 };
//         }

//     }

//     // if user is not logged in, add cartitems to localStorage:
//     else
//     {
//         localStorage.setItem('cart', JSON.stringify(cartItems));
//     }



//     state.cartItems = cartItems
// })


const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const cartItems = { ...state.cartItems }; // making o copy of the cartitems
            const { product, qty, logIn } = action.payload; // argument you were passing while dispatching (two arguments are there)

            // if user is logged in:
            if (logIn)
            {

            }

            // if the product is already in the cart
            if (cartItems[product._id]) {
                cartItems[product._id].quantity += qty;
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

            if (cart) {
                state.cartItems = cart;
            }
        },

        // reducer to set the empty like initially:
        resetCart: (state, action) => {
            state.loading = false
            state.cartItems = {}
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getCartItems.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getCartItems.fulfilled, (state, action) => {
            state.loading = false
            state.cartItems = action.payload
            // state.productsByPrice = {
            //     ...action.payload.productsByPrice
            // }
        })

        builder.addCase(getCartItems.rejected, (state, action) => {
            state.loading = false
            // state.error = action.payload.error
        })
    }
})

export default cartSlice.reducer;
export const {addToCart, refreshAndGetCart, resetCart } = cartSlice.actions