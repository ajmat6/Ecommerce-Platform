import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../helpers/axios"
import { json } from "react-router-dom"

// defining initial State:
const initialState = {
    userToken: null,
    userInfo: {
        // firstName: '',
        // lastName: '',
        // email: '',
        // picture: ''
    },
    authenticate: false,
    authenticating: false,
    error: null,
    message: ''
}

// createAsyncThunk for handling async actions, it takes type of action as its first argument
export const authCredentials = createAsyncThunk('authCredentials', async (user) => {
    const res = await axiosInstance.post('/signin', {...user}) // splitting up email and password coming as argument

    // if sign in details were correct:
    if(res.status === 200)
    {
        // extracting token and user from the response:
        console.log(res, "bhai fronted ka login");
        const {token, user} = res.data
        localStorage.setItem('token', token) // storing token in localStorage
        localStorage.setItem('user', JSON.stringify(user)); // storing user in localStorage in the form of string 
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

// sign up async action:
export const signUpCredentials = createAsyncThunk('signupCredentials', async (user) => {
    const res = await axiosInstance.post('/signup', {...user}) // splitting up firstName, lastName, email and password coming as argument

    // if sign in details were correct:
    if(res.status === 200)
    {
        // extracting token and user from the response:
        const {token, user} = res.data
        localStorage.setItem('token', token) // storing token in localStorage
        localStorage.setItem('user', JSON.stringify(user)); // storing user in localStorage in the form of string 
    }

    return res.data;
})

// action to sign out admin:
export const signoutAction = createAsyncThunk('signout', async () => {
    try
    {
        const res = axiosInstance.post('/signout');
        if(res.status == 200)
        {
            localStorage.clear()
        }
        else
        {
            console.log(res.data.error)
        }
    }
    catch(error)
    {
        console.log(error.message)
    }
})

// update action: 
export const updateUserInfo = createAsyncThunk('updateUserInfo', async (payload) => {
    const res = await axiosInstance.post('/user/update', payload)
    console.log(res)
    if(res.status === 200)
    {
        localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data
})


const userAuthSlice = createSlice({
    name: "auth",
    initialState: initialState,

    // Reducers:
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user')
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

        builder.addCase(signUpCredentials.pending, (state) => {
            state.authenticating = true
            state.authenticate = false
        })

        builder.addCase(signUpCredentials.fulfilled, (state, action) => {
            state.authenticating = false
            state.authenticate = true
            state.userToken = action.payload.token
            state.userInfo = action.payload.user
            state.message = action.payload.message
        })

        builder.addCase(signUpCredentials.rejected, (state, action) => {
            state.authenticating = false
            state.authenticate = false
            // state.error = action.payload.message
        })

        builder.addCase(signoutAction.pending, (state) => {
            state.authenticating = true
        })

        builder.addCase(signoutAction.fulfilled, (state, action) => {
            state.authenticate = false
            state.userToken = null
            state.userInfo = {
                firstName: '',
                lastName: '',
                email: '',
                picture: ''
            }
            localStorage.clear()
        })

        builder.addCase(signoutAction.rejected, (state, action) => {
            state.authenticating = false
            state.authenticate = false
            // state.error = action.payload.message
        })

        builder.addCase(updateUserInfo.pending, (state) => {
            state.authenticating = true
            state.authenticate = true
        })

        builder.addCase(updateUserInfo.fulfilled, (state, action) => {
            state.authenticating = false
            state.authenticate = true
            state.userInfo = action.payload.user
        })

        builder.addCase(updateUserInfo.rejected, (state, action) => {
            state.authenticating = false
            state.authenticate = true
            // state.error = action.payload.message
        })
    
    }
})

export default userAuthSlice.reducer
export const { logout, isUserLoggedIn } = userAuthSlice.actions