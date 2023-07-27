import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    categories: [],
    loading: false,
    error: ''
}

// async action to get all the categories:
export const getAllCategories = createAsyncThunk('getAllCategories', async () => {
    const res = await axiosInstance.get('/category/getcategories')
    console.log("fetching all categories")
    console.log(res);

    return res.data;
})

// async action to create a category:
export const addCategory = createAsyncThunk('addCategory', async (form) => {
    const headers = {
        "auth-token": localStorage.getItem('token')
    }

    const res = await axiosInstance.post('/category/create', form, {headers});

    console.log(res)

    return res;
})

const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducer: {

    },

    extraReducers: (builder) => {
        builder.addCase(getAllCategories.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload.categoryList
        })

        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.error
        })

        builder.addCase(addCategory.pending, (state) => {
            state.loading = true
        })

        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.loading = false

            // if new category is succesfully created:
            if(action.payload.status == 200)
            {
                state.categories = action.payload.categoryList
            }

            // if category already exist:
            if(action.payload.status == 400)
            {
                state.error = action.payload.error
            }
        })

        builder.addCase(addCategory.rejected, (state, action) => {
            state.loading = false
            state.error = "addCategory failed due to some problem"
        })
    }
})

export default categorySlice.reducer;