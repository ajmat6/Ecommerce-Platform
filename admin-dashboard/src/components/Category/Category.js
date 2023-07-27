import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, addCategory } from '../../reducers/categoryReducer';

function Category() {
    const category = useSelector((state) => state.category)
    const dispatch = useDispatch();

    // defining states:
    const [categoryName, setcategoryName] = useState('')
    const [parentCategoryId, setparentCategoryId] = useState('')
    const [categoryImage, setcategoryImage] = useState('')

    // fetching all the categories using useEffect:
    useEffect(() => {
        console.log("cat")
        dispatch(getAllCategories());
    }, [])

    // rendering all categories:
    const renderCategories = (category) => {
        let categories = [];
        for (let cat of category) {
            categories.push(
                <li key={cat.name}>
                    {cat.name}
                    {cat.children.length > 0 && ( // if there are subcategories present, then calling renderCategories recursively
                        <ul>
                            {renderCategories(cat.children)}
                        </ul>
                    )}
                </li>
            )
        }

        return categories;
    }

    // creating a list of categories:
    const createCategoryList = (categories, option = []) => {
        for(let category of categories)
        {
            option.push({
                value: category._id,
                name: category.name
            });

            if(category.children.length > 0)
            {
                createCategoryList(category.children, option)
            }
        }

        return option;
    }

    // funtion to handle selection of the image:
    const handleImage = (e) => {
        setcategoryImage(e.target.files[0]); // files will be like an array but there is only one option of file uploading
    }

    // function for handling submission of adding a category modal:
    const hadleCategorySelection = (e) => {
        const form = new FormData(); // this provides an easy method to create key-value pairs of the form fiels and their input values which will make it easy to send them to backend

        // all entered values in the add category form:
        // const categoryValues = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // }

        // console.log(categoryValues);

        form.append('name', categoryName); // name is the key field in the postman that backend will access as req.body.name as the category name
        form.append('parentId', parentCategoryId); // first is key and second is value same as like postman
        form.append('categoryImage', categoryImage);

        dispatch(addCategory(form));
    }

    return (
        // Passing sidebar as prop
        <Layout sidebar>
            <div className="container">
                <div className="row">
                    <div className='col-md-12'>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                                Add Category
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className='col-md-12'>
                        <ul>
                            {/* category is one of the reducer in the store and categories is one of initialState values in categoryReducer */}
                            {renderCategories(category.categories)}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Modal for adding category */}

            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Add New Category</h5>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body form-control">
                            <input
                             className='form-control my-3'
                             type="text"
                             value={categoryName}
                             placeholder='Add Category Name'
                             onChange={(e) => setcategoryName(e.target.value)}
                             />

                            {/* to select category from the available options */}
                            {/* below category value is value in the createCategoryList function which is set below as a value of option */}
                             <select className='form-control my-3'
                              value={parentCategoryId}
                              onChange={(e) => setparentCategoryId(e.target.value)}
                              > 
                                {/* First option is itself 'Select Category' and the rest are rendered using createCategoryList function */}
                                <option value={0}>Select Category</option>
                                {
                                    createCategoryList(category.categories).map((value) => 
                                        <option key={value.value} value={value.value}>{value.name}</option>
                                    )
                                }

                             </select>

                            {/* selecting image for the category */}
                            <input type="file"
                             name='categoryImage'
                             onChange={handleImage}
                             placeholder='Choose Category Image'
                             className='form-control'/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={hadleCategorySelection}>Add Category</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Category
