import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    categories: [],
    loading: false,
    error: ''
}

export const getAllCategories = createAsyncThunk('getInitialData', async () => {
    const res = await axiosInstance.post('/initialdata')
    console.log(res)
    return res;
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
            if(action.payload.status === 200)
            {
                state.categories = action.payload.data.categoryList
            }
        })

        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.loading = false
            state.error = "getting all categories rejected!"
        })
    }
})

export default categorySlice.reducer;