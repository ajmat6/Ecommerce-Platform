import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false
}

// async action to fetch product by slug:
export const productBySlug = createAsyncThunk('productBySlug', async (slug) => {
    const res = await axiosInstance.get(`/product/${slug}`);
    console.log("Product by slug")
    console.log(res);
})

const productBySlugSlice = createSlice({
    name: 'productBySlug',
    initialState: initialState,
    reducer: {

    },

    extraReducers: (builder) => {
        builder.addCase(productBySlug.pending, (state) => {
            state.loading = true
        })

        builder.addCase(productBySlug.fulfilled, (state, action) => {
            state.loading = false
        })

        builder.addCase(productBySlug.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export default productBySlugSlice.reducer;