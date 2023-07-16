import { createSlice } from "@reduxjs/toolkit"

// defining initial State:
const initialState = {
    name : "Ajmat Kathat"
}

const slice = createSlice({
    name: "Ajmat",
    initialState: initialState,
    reducers: {

    }
})

export default slice.reducer
