import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false,
    topics: []
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

export const addTopic = createAsyncThunk('addTopic', async (payload) => {
    try
    {
        const headers = {
            "auth-token": localStorage.getItem('token')
        }

        const res = await axiosInstance.post('/home/addtopic', payload, {headers})
        console.log(res, 'addtopic');
        // return res;
    }

    catch(error)
    {
        console.log(error.message);
    }
})

export const getTopics = createAsyncThunk('getTopics', async () => {
    try
    {
        const headers = {
            "auth-token": localStorage.getItem('token')
        }

        const res = await axiosInstance.get('/home/getTopics', {headers})
        console.log(res, 'getTopics');
        return res;
    }

    catch(error)
    {
        console.log(error.message);
    }
})

export const addHomeProduct = createAsyncThunk('addProduct', async (form) => {
    try
    {
        const headers = {
            "auth-token": localStorage.getItem('token')
        }

        console.log(form)
        const res = await axiosInstance.post('/home/addProduct', form)
        console.log(res)
        return res;
    }

    catch(error)
    {
        console.log(error.message);
    }
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

        builder.addCase(addTopic.pending, (state) => {
            state.loading = true
        })

        builder.addCase(addTopic.fulfilled, (state, action) => {
            state.loading = false
        })

        builder.addCase(addTopic.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase(getTopics.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getTopics.fulfilled, (state, action) => {
            state.loading = false
            state.topics = action.payload.data
        })

        builder.addCase(getTopics.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase(addHomeProduct.pending, (state) => {
            state.loading = true
        })

        builder.addCase(addHomeProduct.fulfilled, (state, action) => {
            state.loading = false
            // state.topics = action.payload.data
        })

        builder.addCase(addHomeProduct.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export default homeSlice.reducer