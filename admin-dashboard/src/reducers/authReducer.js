import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import axiosInstance from "../helpers/axios";

// const logout = createAction('auth/logout'); // creating action (imorted from actions)

// defining initial State:
const initialState = {
    userToken: null,
    userInfo: {
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    error: null
}

// createAsyncThunk for handling async actions, it takes type of action as its first argument
export const authCredentials = createAsyncThunk('/authReducer/authCredentials', async (user) => {
    const res = await axiosInstance.post('/admin/signin', {...user}) // splitting up email and password coming as argument

    // if sign in details were correct:
    if(res.status === 200)
    {
        // extracting token and user from the response:
        const {token, user} = res.data
        localStorage.setItem('token', token) // storing token in localStorage
        localStorage.setItem('user', JSON.stringify(user)); // storing user in localStorage in the form of string 
        console.log("Localstorage me token bhej diya bhai")
    }
    else
    {
        if(res.status === 400)
        {
            console.log("Axios fail ho gaya bhai!");
        }
    }

    return res.data;
})

const authSlice = createSlice({
    name: "Ajmat",
    initialState: initialState,

    // Reducers:
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem('token');
            state.userToken = null
            state.authenticate = false
        },

        // on refreshing token becomes null in data (not in localStorage) so to remove this problem this reducer and action is used:
        isUserLoggedIn: (state, action) => {
            const token = localStorage.getItem('token');
            if(token)
            {
                const user = JSON.parse(localStorage.getItem('user')) // parsing into json as user is stored in the form of string in the localStorage
                state.authenticate = true
                state.authenticating = false
                state.userToken = token
                state.userInfo = user
            }

            else
            {
                state.authenticating = false
                state.authenticate = false
            }
        }
    },

    // extrareducers for async actions:
    extraReducers: (builder) => {
        builder.addCase(authCredentials.pending, (state) => {
            state.authenticating = true
        })

        builder.addCase(authCredentials.fulfilled, (state, action) => {
            state.authenticating = false
            state.authenticate = true
            state.userToken = action.payload.token
            state.userInfo = action.payload.user
        })

        builder.addCase(authCredentials.rejected, (state, action) => {
            state.authenticating = false
            state.authenticate = false
            // state.error = action.payload.error
        })
    }
})

export default authSlice.reducer
export const { logout, isUserLoggedIn } = authSlice.actions
// export const {loginSuccess} = authSlice.actions; // exporting actions created by the reducer
