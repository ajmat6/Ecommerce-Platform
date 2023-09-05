import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false,
    error: null,
    page: {}
}

export const createPage = createAsyncThunk('createPage', async (form) => {
    try
    {
        const headers = {
            "auth-token": localStorage.getItem('token')
        }

        const res = await axiosInstance.post('/create/page', form, {headers})
        return res;
    }

    catch(error)
    {
        console.log(error.message);
    }
})

export const getProductPage = createAsyncThunk('getProductPage', async (payload) => {
    const {categoryId, type} = payload;
    const res = await axiosInstance.post(`/page/${categoryId}/${type}`)
    console.log(res);
    // return res;
})

const pageSlice = createSlice({
    name: 'page',
    initialState: initialState,
    reducers: {

    },

    extraReducers: (builder) =>  {
        builder.addCase(createPage.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createPage.fulfilled, (state, action) => {
            state.loading = false
        })

        builder.addCase(createPage.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export default pageSlice.reducer