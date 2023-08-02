import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false,
    products: [],
    error: ''
}


export const addProduct = createAsyncThunk('addProduct', async (form) => {
    const headers = {
        'auth-token': localStorage.getItem('token')
    }
    const res = axiosInstance.post('/product/create', form, {headers})
    console.log(res)
})

// fetching all products and categories:
export const getallProducts = createAsyncThunk('getInitialData', async () => {
    const res = await axiosInstance.post('/initialdata')
    return res;
})

const productSlice = createSlice({
    name: 'prduct',
    initialState: initialState,
    reducer: {

    },

    extraReducers: (builder) => {
        builder.addCase(getallProducts.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getallProducts.fulfilled, (state, action) => {
            state.loading = false

            if(action.payload.status === 200)
            {
                state.products = action.payload.data.products
            }
        })

        builder.addCase(getallProducts.rejected, (state, aciton) => {
            state.loading = false
            state.error = "Products fetching failed"
        })
    }
})

export default productSlice.reducer;