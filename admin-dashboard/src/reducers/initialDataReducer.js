import axiosInstance from "../helpers/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: [],
    error: ''
}

export const getInitialData = createAsyncThunk('getInitialData', async () => {
    const res = axiosInstance.post('/initialdata')
    return res;
})

const initialDataSlice = createSlice({
    name: 'intialData',
    initialState: initialState,
    reducer: {

    },

    extraReducers: (builder) => {
        builder.addCase(getInitialData.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getInitialData.fulfilled, (state, action) => {
            state.loading = false

            // if fetching initialData remains successful:
            if(action.payload.status === 200)
            {
                state.data = action.payload.
            }
        })
    }

})

export default initialDataSlice.reducer;