import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false,
    orders: [],
    error: null,
}

export const getOrders = createAsyncThunk('customerOrders', async () => {
    const res = await axiosInstance.post('/initialdata');
    return res.data;
})

export const orderUpdate = createAsyncThunk('orderUpate', async (payload) => {
    const res = await axiosInstance.post('/admin/updateorder', payload);
    console.log(res)
    return true
})

const pageSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {

    },

    extraReducers: (builder) =>  {
        builder.addCase(getOrders.pending, (state) => {
            state.loading = true
        })
        
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload.orders
        })

        builder.addCase(getOrders.rejected, (state, action) => {
            state.loading = false
            state.error = "Fetching customers orders failed"
        })

        builder.addCase(orderUpdate.pending, (state) => {
            state.loading = true
        })
        
        builder.addCase(orderUpdate.fulfilled, (state, action) => {
            state.loading = false
            // state.orders = action.payload.orders
        })

        builder.addCase(orderUpdate.rejected, (state, action) => {
            state.loading = false
            state.error = "Updating order failed"
        })
    }
})

export default pageSlice.reducer