import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false,
    products: [],
    productsByPrice: {
        under5k: [],
        under10k: [],
        under20k: [],
        under30k: [],
        under50k: [],
        under100k: [],
        above100k: [],
    },
    pageRequest: false,
    page: {},
    error: null
}

export const getProductPage = createAsyncThunk('getProductPage', async (payload) => {
    const {cid, type} = payload;

    const res = await axiosInstance.get(`/page/${cid}/${type}`);
    console.log(res);
    return res.data;
})

const getProductPageSlice = createSlice({
    name: 'getProductPage',
    initialState: initialState,
    reducer: {

    },

    extraReducers: (builder) => {
        builder.addCase(getProductPage.pending, (state) => {
            state.pageRequest = true
        })

        builder.addCase(getProductPage.fulfilled, (state, action) => {
            state.pageRequest = false
            state.page = action.payload.page
            // state.productsByPrice = {
            //     ...action.payload.productsByPrice
            // }
        })

        builder.addCase(getProductPage.rejected, (state, action) => {
            state.pageRequest = false
            state.error = action.payload.error
        })
    }
})

export default getProductPageSlice.reducer;