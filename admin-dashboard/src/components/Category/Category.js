import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../reducers/categoryReducer';

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
                            {renderCategories(category.categories)}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Modal for adding category */}


            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                Launch demo modal
            </button> */}

            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Add New Category</h5>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input
                             type="text"
                             value={categoryName}
                             placeholder='Add Category Name'
                             onChange={(e) => setcategoryName(e.target.value)}/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary">Add Category</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Category
