import { createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../helpers/axios";

// defining initial State:
const initialState = {
    name: 'ajmat'
}

const authSlice = createSlice({
    name: "Ajmat",
    initialState: initialState,
    // Reducers:
    reducers: {
        authAction: async (state, action) => {
            console.log(action.payload);
            console.log(action) // it will print action type as Ajmat/authAction

            const res = await axiosInstance.post('/admin/signin', {
                // putting payload in the signin header getting from the form values
                ...action
            })
        }
    }
})

export default authSlice.reducer
export const {authAction} = authSlice.actions; // exporting actions created by the reducer
