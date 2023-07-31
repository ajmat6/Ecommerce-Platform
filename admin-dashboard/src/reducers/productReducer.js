import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    loading: false
}


export const addProduct = createAsyncThunk('addProduct', async (form) => {
    const headers = {
        'auth-token': localStorage.getItem('token')
    }
    const res = axiosInstance.post('/product/create', form, {headers})
    console.log(res)
})

const productSlice = createSlice({
    name: 'prduct',
    initialState: initialState,
    reducer: {

    }
})

export default productSlice.reducer;