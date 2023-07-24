// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// import axiosInstance from "../helpers/axios";

// // defining initial State:
// const initialState = {
//     userToken: null,
//     userInfo: {
//         firstName: '',
//         lastName: '',
//         email: '',
//         picture: ''
//     },
//     authenticate: false,
//     authenticating: false,
//     error: null
// }

// // createAsyncThunk for handling async actions, it takes type of action as its first argument
// export const signUpCredentials = createAsyncThunk('/signupReducer/signupCredentials', async (user) => {
//     console.log("sign up credentials")
//     const res = await axiosInstance.post('/admin/signup', {...user}) // splitting up firstName, lastName, email and password coming as argument

//     // if sign in details were correct:
//     if(res.status === 200)
//     {
//         // extracting token and user from the response:
//         const {token, user} = res.data
//         localStorage.setItem('token', token) // storing token in localStorage
//         // localStorage.setItem('user', JSON.stringify(user)); // storing user in localStorage in the form of string 
//         console.log("Localstorage me token bhej diya bhai")
//     }
//     else
//     {
//         if(res.status === 400)
//         {
//             console.log("Axios fail ho gaya bhai!");
//         }
//     }

//     return res.data;
// })

// const signUpSlice = createSlice({
//     name: "signup",
//     initialState: initialState,

//     // Reducers:
//     reducers: {
        
//     },

//     // extrareducers for async actions:
//     extraReducers: (builder) => {
//         builder.addCase(signUpCredentials.pending, (state) => {
//             state.authenticating = true
//         })

//         builder.addCase(signUpCredentials.fulfilled, (state, action) => {
//             state.authenticating = false
//             state.authenticate = true
//             state.userToken = action.payload.token
//             state.userInfo = action.payload.user
//         })

//         builder.addCase(signUpCredentials.rejected, (state, action) => {
//             state.authenticating = false
//             state.authenticate = false
//             state.error = action.payload.message
//         })
//     }
// })

// export default signUpSlice.reducer