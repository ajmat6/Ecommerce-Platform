import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    fetching: false,
    allAddress: [],
    error: ''
}

export const createAddress = createAsyncThunk('createAddress', async (payload) => {
    const res = await axiosInstance.post('/user/address/create', payload);
    console.log(res, "add address");
    
    if(res.status == 201)
    {
        const {
            addAddress: {
                address
            }
        } = res.data

        console.log(address, "get address")
        return address;
    }
})

export const getUserAddress = createAsyncThunk('getUserAddress', async () => {
    const res = await axiosInstance.get('/user/getaddress')
    console.log(res, "get address")
    
    // extracting address from the response(see backend)
    if(res.status == 200)
    {
        const {
            userAddress: {
                address
            }
        } = res.data

        console.log(address, "get address")
        return address;
    }

    else return [];
})


const addressSlice = createSlice({
    name: 'address',
    initialState: initialState,
    reducer: {

    },

    extraReducers: (builder) => {
        builder.addCase(createAddress.pending, (state) => {
            state.fetching = true
        })

        builder.addCase(createAddress.fulfilled, (state, action) => {
            state.fetching = false
            state.allAddress = action.payload
        })

        builder.addCase(createAddress.rejected, (state, action) => {
            state.fetching = false
            state.error = "creating user address rejected!"
        })

        builder.addCase(getUserAddress.pending, (state) => {
            state.fetching = true
        })

        builder.addCase(getUserAddress.fulfilled, (state, action) => {
            state.fetching = false
            state.allAddress = action.payload
        })

        builder.addCase(getUserAddress.rejected, (state, action) => {
            state.fetching = false
            state.error = "getting user address rejected!"
        })
    }
})

export default addressSlice.reducer;