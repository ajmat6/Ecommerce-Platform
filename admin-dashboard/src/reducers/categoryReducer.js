import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

const initialState = {
    categories: [],
    loading: false,
    error: ''
}

// function for pushing new category into categories[] when a new category is added:
// const buildNewCategories = (categories, category, Id) => {
//     let myCategories = [];

//     // if the new category does not have any parent means it is brand new category:
//     if(Id == undefined)
//     {
//         return [
//             ...categories,
//             {
//                 _id: category._id,
//                 name: category.name,
//                 slug: category.slug,
//                 children: []
//             }
//         ]
//     }

//     for(let cat of categories)
//     {
//         // checking conditions for adding category into the array:
//         if(cat._Id === Id) 
//         {
//             // creating new category
//             const newCategory = {
//                 id: category._id,
//                 name: category.name,
//                 slug: category.slug,
//                 parentId: category.parentId
//             }
//             myCategories.push({
//                 ...cat, // existing category as it is push
//                 children: cat.children && cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory] // if children exist of parent category then adding new category with them otherwise creating a new array of children
//             }) 
//         }

//         else
//         {
//             myCategories.push({
//                 ...cat, // existing category as it is push
//                 children: cat.children ? buildNewCategories(cat.children, category, Id) : [] // chilren exist for a category, then calling function recursively
//             })
//         }
//     }

//     return myCategories;
// }

// get all categories async action:
export const getAllCategories = createAsyncThunk('getInitialData', async () => {
    const res = await axiosInstance.post('/initialdata')
    console.log(res)
    return res;
})



// async action to create a category:
export const addCategory = createAsyncThunk('addCategory', async (form) => {
    try
    {
        console.log(form, "category form")
        const res = await axiosInstance.post('/category/create', form);
        return res;

        if(res.status === 200) return true;
        else return false;
    }

    catch(error)
    {
        console.log(error.message);
    }
})

// async action to update categories:
export const updateCategoryAsyncAction = createAsyncThunk('updateCategory', async (form) => {
    try
    {
        const headers = {
            "auth-token": localStorage.getItem('token')
        }
    
        const res = await axiosInstance.post('/category/update', form, {headers});
    
        console.log(res)
    
        if(res.status == 201) return true;
        else return false
    }
    catch(error)
    {
        console.log(error.message);
    }
})

// async action to delete categories:
export const deleteCategoryAsyncAction = createAsyncThunk('deleteCategory', async (ids) => {
    try
    {
        const headers = {
            "auth-token": localStorage.getItem('token')
        }
    
        const res = await axiosInstance.post('/category/delete', ids, {headers});
    
        console.log(res)
        if(res.status == 201) return true;
        else return false
    }
    catch(error)
    {
        console.log(error.message);
    }
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
                state.categories = action.payload.data.categoryList // from here categories[] state array is filled
            }
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

            if(action.payload == false) 
            {
                state.error = "Category Aready Exist!"
            }

            // if new category is succesfully created:
            // if(action.payload.status == 200)
            // {
            //     const newCat = buildNewCategories(state.categories, action.payload.data._category, action.payload.data._category.parentId);
            //     console.log(newCat);
            //     state.categories = newCat
            // }

            // // if category already exist:
            // if(action.payload.status == 400)
            // {
            //     state.error = action.payload.data.error
            // }
        })

        builder.addCase(addCategory.rejected, (state, action) => {
            state.loading = false
            state.error = "addCategory failed due to some problem"
        })

        builder.addCase(updateCategoryAsyncAction.pending, (state) => {
            state.loading = true
        })

        builder.addCase(updateCategoryAsyncAction, (state, action) => {
            state.loading = false
        })

        builder.addCase(updateCategoryAsyncAction.rejected, (state, action) => {
            state.loading = false
            state.error = "Updating error failed!"
        })

        builder.addCase(deleteCategoryAsyncAction.pending, (state) => {
            state.loading = true
        })

        builder.addCase(deleteCategoryAsyncAction.fulfilled, (state, action) => {
            state.loading = false
        })

        builder.addCase(deleteCategoryAsyncAction.rejected, (state, action) => {
            state.loading = false
            state.error = "Deleting category failed!"
        })
    }
})

export default categorySlice.reducer;