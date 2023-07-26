import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    categories: [],
    loading: false,
    error: ''
}

export const getAllCategories = createAsyncThunk('getAllCategories', async () => {
    const res = await axiosInstance.get('/category/getcategories')
    console.log("fetching all categories")
    console.log(res);

    return res.data;
})

const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducer: {

    },

    extraReducers: (builder) => {
        builder.addCase(getAllCategories.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload.categoryList
        })

        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.error
        })
    }
})

export default categorySlice.reducer;