import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false,
    banners: [],
    products: [],
    error: null
}

export const getBanners = createAsyncThunk('getBanners', async () => {
    const res = await axiosInstance.get('/getbanners')
    // console.log(res.data.allBanners[0].banners, "getBanners")
    return res.data.allBanners[0];
})

export const getHomeProducts = createAsyncThunk('homeProducts', async () => {
    const res = await axiosInstance.get('/home/getProducts')
    // console.log(res.data.allBanners[0].banners, "getBanners")
    console.log(res)
    return res.data;
})


const homePageSlice = createSlice({
    name: 'home',
    initialState: initialState,
    reducer: {

    },

    extraReducers: (builder) => {
        builder.addCase(getBanners.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getBanners.fulfilled, (state, action) => {
            state.loading = false
            state.banners = action.payload.banners
        })

        builder.addCase(getBanners.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase(getHomeProducts.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getHomeProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })

        builder.addCase(getHomeProducts.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export default homePageSlice.reducer;