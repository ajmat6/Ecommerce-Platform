import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false,
    page: {}
}

export const addBanners = createAsyncThunk('addBanners', async (form) => {
    try
    {
        const headers = {
            "auth-token": localStorage.getItem('token')
        }

        const res = await axiosInstance.post('/home/banners', form, {headers})
        return res;
    }

    catch(error)
    {
        console.log(error.message);
    }
})

export const getBanners = createAsyncThunk('getBanners', async () => {
    const headers = {
        "auth-token": localStorage.getItem('token')
    }

    const res = await axiosInstance.get('/getbanners', {headers})
    console.log(res)
    return res;
})

const homeSlice = createSlice({
    name: 'home',
    initialState: initialState,
    reducers: {

    },

    extraReducers: (builder) =>  {
        builder.addCase(addBanners.pending, (state) => {
            state.loading = true
        })

        builder.addCase(addBanners.fulfilled, (state, action) => {
            state.loading = false
        })

        builder.addCase(addBanners.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export default homeSlice.reducer