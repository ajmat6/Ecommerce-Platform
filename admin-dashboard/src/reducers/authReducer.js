import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../helpers/axios";

// defining initial State:
const initialState = {
    email: 'ajmat@gmail.com',
    password: 'ajmatkathat'
}

// createAsyncThunk for handling async actions, it takes type of action as its first argument
export const authCredentials = createAsyncThunk('/authReducer/authCredentials', async (user) => {
    return await axiosInstance.post('/admin/signin')
    .then((response) => response.data)
    .catch((error) => {
        console.log(error.message);
    })
})

const authSlice = createSlice({
    name: "Ajmat",
    initialState: initialState,

    // Reducers:
    reducers: {

    },

    // extrareducers for async actions:
    extraReducers: (builder) => {
        builder.addCase(authCredentials.fulfilled, (state, action) => {
            state.email = action.payload
            state.password = action.payload

            console.log(action.payload)
        })
    }
})

export default authSlice.reducer
// export const {authAction} = authSlice.actions; // exporting actions created by the reducer
