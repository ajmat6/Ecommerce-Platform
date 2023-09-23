import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";


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

export const getCartItems = createAsyncThunk('getCartItems', async () => {
    const res = await axiosInstance.post('/user/cart/getCartItems');

    if (res.status === 200)
    {
        const { cartItems } = res.data;
        console.log(cartItems);
        return cartItems
    }
})

export const addToCartDatabase = createAsyncThunk('addToCartDB', async (payload) => {
    const res = await axiosInstance.post('/user/cart/add-to-cart', payload);
    console.log(res);
    if(res.status === 201)
    {
        return true;
    }
})

export const removeCartItem = createAsyncThunk('removeCartItem', async (payload) => {
    const res = await axiosInstance.post('/user/cart/remove-item', payload);
    console.log(res, 'remove');
    if(res.status === 202)
    {
        const res2 = await axiosInstance.post('/user/cart/getCartItems');

        if (res2.status === 200)
        {
            const { cartItems } = res2.data;
            return cartItems
        }
    }
})

export const updateCart = createAsyncThunk('updateCart', async () => {
    let cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null

    localStorage.removeItem('cart');
    
    // if items are there in the localstorage which were stored when you were logged out, then include them in db:
    if(cartItems)
    {
        const payload = {
            cartItems: Object.keys(cartItems).map((key, index) => {
                return {
                    productId: cartItems[key]._id,
                    quantity: cartItems[key].quantity
                }
            })
        }

        console.log(payload)

        if(Object.keys(cartItems).length > 0)
        {
            const res = await axiosInstance.post('/user/cart/add-to-cart', payload);
            if(res.status == 201)
            {
                const res2 = await axiosInstance.post('/user/cart/getCartItems')
                if(res2.status === 200)
                {
                    return res2
                }
            }
        }
    }

    else return {}
})


const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const cartItems = { ...state.cartItems }; // making o copy of the cartitems
            const { product, qty, logIn } = action.payload; // argument you were passing while dispatching (two arguments are there)

            // if the product is already in the cart
            if (cartItems[product._id]) {
                cartItems[product._id].quantity += qty;
            }

            // if not in cart insert it
            else {
                cartItems[product._id] = { ...product, quantity: 1 };
            }

            if(logIn == false)
            {
                localStorage.setItem('cart', JSON.stringify(cartItems));
            }

            state.cartItems = cartItems

            // return true;
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
            state.cartItems = {}
            // state.error = action.payload.error
        })

        builder.addCase(updateCart.pending, (state) => {
            state.updatingCart = true
        })

        builder.addCase(updateCart.fulfilled, (state, action) => {
            state.updatingCart = false
            if(action.payload.status === 200)
            {
                state.cartItems = action.payload.cartItems
            }
            else state.cartItems = {}
        })

        builder.addCase(updateCart.rejected, (state, action) => {
            state.updatingCart = false
            state.cartItems = {}
            // state.error = action.payload.error
        })

        builder.addCase(removeCartItem.pending, (state) => {
            state.loading = true
        })

        builder.addCase(removeCartItem.fulfilled, (state, action) => {
            state.loading = false
            state.cartItems = action.payload
        })

        builder.addCase(removeCartItem.rejected, (state, action) => {
            state.loading = false
            // state.cartItems = {}
            // state.error = action.payload.error
        })
    }
})

export default cartSlice.reducer;
export const {addToCart, refreshAndGetCart, resetCart } = cartSlice.actions