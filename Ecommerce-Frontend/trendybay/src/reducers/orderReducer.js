import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false,
    orders: [],
    error: '',
    orderDetails: {},
    orderId: null
}

export const addOrders = createAsyncThunk('addOrders', async (payload) => {
    const res = await axiosInstance.post('/user/addOrder', payload)
    console.log(res)

    if(res.status === 201)
    {
        return res.data;
        // return true
    }
})

export const getOrders = createAsyncThunk('getOrders', async () => {
    const res = await axiosInstance.get('/user/getOrders');
    console.log(res)
    return res.data
})

export const orderDetail = createAsyncThunk('orderDetail', async (payload) => {
    const res = await axiosInstance.post('/user/orderDetails', payload);
    console.log(res)
    return res.data
})

const orderSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducer: {

    },

    extraReducers: (builder) => {
        builder.addCase(addOrders.pending, (state) => {
            state.loading = true
        })

        builder.addCase(addOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orderId = action.payload.order._id
        })

        builder.addCase(addOrders.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase(getOrders.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload.allOrders
        })

        builder.addCase(getOrders.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase(orderDetail.pending, (state) => {
            state.loading = true
        })

        builder.addCase(orderDetail.fulfilled, (state, action) => {
            state.loading = false
            state.orderDetails = action.payload.order
        })

        builder.addCase(orderDetail.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export default orderSlice.reducer;