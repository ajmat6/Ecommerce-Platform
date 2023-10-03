import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false,
    banners: [],
    error: null
}

export const getBanners = createAsyncThunk('getBanners', async () => {
    const res = await axiosInstance.get('/getbanners')
    // console.log(res.data.allBanners[0].banners, "getBanners")
    return res.data.allBanners[0];
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
    }
})

export default homePageSlice.reducer;