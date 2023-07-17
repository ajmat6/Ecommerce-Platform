import { createSlice } from "@reduxjs/toolkit"

// defining initial State:
const initialState = {
    name: 'ajmat'
}

const authSlice = createSlice({
    name: "Ajmat",
    initialState: initialState,
    // Reducers:
    reducers: {
        authAction: (state, action) => {
            console.log(action.payload);
            console.log(action) // it will print action type as Ajmat/authAction
        }
    }
})

export default authSlice.reducer
export const {authAction} = authSlice.actions; // exporting actions created by the reducer
