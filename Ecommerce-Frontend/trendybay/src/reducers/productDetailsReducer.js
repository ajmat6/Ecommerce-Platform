import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../helpers/axios'

const initialState = {
    loading: false,
    details: {}
}

export const productDetails = createAsyncThunk('productDetails', async (productId) => {
    const res = await axiosInstance.get(`/product/productDetails/${productId}`);
    console.log(res, "product details");
    return res
})

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder.addCase(productDetails.pending, (state) => {
            state.loading = true
        })

        builder.addCase(productDetails.fulfilled, (state, action) => {
            state.loading = false
            state.details = action.payload.data
        })
    }

})

export default productDetailsSlice.reducer;