import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    categories: [],
    loading: false,
    error: ''
}

// function for pushing new category into categories[] when a new category is added:
const buildNewCategories = (categories, category, Id) => {
    let myCategories = [];

    // if the new category does not have any parent means it is brand new category:
    if(Id == undefined)
    {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ]
    }

    for(let cat of categories)
    {
        // checking conditions for adding category into the array:
        if(cat._Id === Id) 
        {
            myCategories.push({
                ...cat, // existing category as it is push
                children: cat.children && cat.children.length > 0 ? buildNewCategories([...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                }], category, Id) : [] // chilren exist for a category, then calling function recursively
            }) 
        }

        else
        {
            myCategories.push({
                ...cat, // existing category as it is push
                children: cat.children ? buildNewCategories(cat.children, category, Id) : [] // chilren exist for a category, then calling function recursively
            })
        }
    }

    return myCategories;
}

export const getAllCategories = createAsyncThunk('getInitialData', async () => {
    const res = await axiosInstance.post('/initialdata')
    console.log(res)
    return res;
})

// async action to get all the categories:
// export const getAllCategories = createAsyncThunk('getAllCategories', async () => {
//     const res = await axiosInstance.get('/category/getcategories')
//     console.log("fetching all categories")
//     console.log(res);

//     return res.data;
// })

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
            if(action.payload.status === 200)
            {
                state.categories = action.payload.data.categoryList
            }

            // state.loading = false
            // state.categories = action.payload.categoryList
        })

        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.loading = false
            state.error = "getting all categories rejected!"
        })

        builder.addCase(addCategory.pending, (state) => {
            state.loading = true
        })

        builder.addCase(addCategory.fulfilled, (state, action) => {
            state.loading = false

            // if new category is succesfully created:
            if(action.payload.status == 200)
            {
                const newCat = buildNewCategories(state.categories, action.payload.data._category, action.payload.data._category.parentId);
                console.log(newCat);
                state.categories = newCat
                state.loading = false
            }

            // if category already exist:
            if(action.payload.status == 400)
            {
                state.error = action.payload.data.error
            }
        })

        builder.addCase(addCategory.rejected, (state, action) => {
            state.loading = false
            state.error = "addCategory failed due to some problem"
        })
    }
})

export default categorySlice.reducer;