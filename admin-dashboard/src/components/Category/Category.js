import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, addCategory, updateCategoryAsyncAction } from '../../reducers/categoryReducer';
import Modal from '../Modal/Modal';

// importing react checkbox tree for category render in admin app and including its css:
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

function Category() {
    const category = useSelector((state) => state.category)
    const dispatch = useDispatch();

    // defining states:
    const [categoryName, setcategoryName] = useState('')
    const [parentCategoryId, setparentCategoryId] = useState('')
    const [categoryImage, setcategoryImage] = useState('')

    // react checkbox tree states:
    const [checked, setchecked] = useState([])
    const [expanded, setexpanded] = useState([])

    // from my side for updating and deleting categories:
    const [checkedArray, setcheckedArray] = useState([])
    const [expandedArray, setexpandedArray] = useState([])
    const [updateCategory, setupdateCategory] = useState(false)

    // rendering all categories:
    const renderCategories = (category) => {
        let categories = [];
        for (let cat of category) {
            categories.push(
                // using react check box tree for showing categories: see docs
                {
                    label: cat.name,
                    value: cat._id,
                    children: cat.children.length > 0 && renderCategories(cat.children) // passing array of chilren recursively
                }
                // <li key={cat.name}>
                //     {cat.name}
                //     {cat.children.length > 0 && ( // if there are subcategories present, then calling renderCategories recursively
                //         <ul>
                //             {renderCategories(cat.children)}
                //         </ul>
                //     )}
                // </li>
            )
        }
        return categories;
    }

    // creating a list of categories:
    const createCategoryList = (categories, option = []) => {
        for (let category of categories) {
            option.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId
            });

            if (category.children.length > 0) {
                createCategoryList(category.children, option)
            }
        }

        return option;
    }

    // funtion to handle selection of the image:
    const handleImage = (e) => {
        setcategoryImage(e.target.files[0]); // files will be like an array but there is only one option of file uploading
    }

    // function for update category:
    const editCategory = () => {
        const linearCategoryList = createCategoryList(category.categories)
        const checkedArray = [];
        const expandedArray = [];

        // when we will select the categories we want to update by checking them and update, then we have to show no of edit options with respect to no of categories selected:
        // categoryId below is the value you used in renderCategory function for checkBox:
        checked.length > 0 && checked.forEach((categoryId, index) => {
            // finding those categories from liner set of categories which are checked for edit:
            // find is js method which return first element in array which matches the condition:
            // linerCategoryList contains value optino in the object which contains the category id:
            const category = linearCategoryList.find((cat, _index) => categoryId == cat.value)

            // if a category is found matched (which will definitely happen as the categories checked are obviously in the linear list of all available categories. It is just for safety)
            category && checkedArray.push(category);
        })

        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = linearCategoryList.find((cat, _index) => categoryId == cat.value)

            category && expandedArray.push(category);
        })

        // pushing expanded and checked Arrays into outer variables with same name to manage state:
        setcheckedArray(checkedArray);
        setexpandedArray(expandedArray)

        console.log({ checked, expanded, linearCategoryList, checkedArray, expandedArray })
    }

    // function to handle update category name input change:
    const handleCategoryUpdate = (key, value, index, type) => {
        // for updating checked array:
        if (type == 'checked') {
            // mapping through checkedArray and finding the category whose value we are changing. If that category is found, we are splitting its current state and just updating the key (which can be name, parent category) otherwise dont change category.
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item
            )

            // changing state of checked array:
            setcheckedArray(updatedCheckedArray);
        }

        // for updating expanded array:
        else {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item
            )

            setexpandedArray(updatedExpandedArray);
        }
    }

    // function for handling submission of adding a category modal:
    const handleCategorySelection = (e) => {
        const form = new FormData(); // this provides an easy method to create key-value pairs of the form fields and their input values which will make it easy to send them to backend

        form.append('name', categoryName); // name is the key field in the postman that backend will access as req.body.name as the category name
        form.append('parentId', parentCategoryId); // first is key and second is value same as like postman
        form.append('categoryPic', categoryImage);

        dispatch(addCategory(form));

        // making add category empty:
        setcategoryName('');
        setparentCategoryId('');
    }

    // function for handling submission of update category modal:
    const handleUpdateCategoryModalSubmit = (e) => {
        const form = new FormData();

        // finding data from expanded as well as checked array:
        expandedArray.forEach((item, index) => {
            form.append('_id', item.value); // expanded array contains value field for id, name for name and parentId for parnetId int the array of expanded categories:
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : ""); // if parentId is present in expanded array, push it in form otherwise append "" in value field of key parentId as in backend logic , you have applied "" for absent of parentId
            form.append('type', item.type)
        })

        checkedArray.forEach((item, index) => {
            form.append('_id', item.value); // expanded array contains value field for id, name for name and parentId for parnetId int the array of expanded categories:
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : ""); // if parentId is present in expanded array, push it in form otherwise append "" in value field of key parentId as in backend logic , you have applied "" for absent of parentId
            form.append('type', item.type);
        })

        dispatch(updateCategoryAsyncAction(form))
        .then(result => { // if category succesfully updated then getting all updated categories on frontend
            if(result)
            {
                dispatch(getAllCategories())
            }
        })

        // setexpandedArray([]);
        // setcheckedArray([]);
    }

    const renderAddCategoryModal = () => {
        return (
            <Modal modaltitle={"Add Category"} handleSubmit={handleCategorySelection} add="Add Category">
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
                    className='form-control'
                />
            </Modal>
        )
    }

    const renderUpdateCategoryModal = () => {
        return (
            <Modal modaltitle={"Edit Category"} handleSubmit={handleUpdateCategoryModalSubmit} add="Edit Category" modalId="editModal" size="modal fade modal-lg">
                {/* for updating expanded Array */}
                <div className="row">
                    <div className="col">
                        Expanded Categories
                    </div>
                </div>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) =>
                        <div className="row" key={index}>
                            <div className="col">
                                <input
                                    className='form-control my-3'
                                    type="text"
                                    value={item.name}
                                    placeholder='Add Category Name'
                                    onChange={(e) => handleCategoryUpdate('name', e.target.value, index, 'expanded')}
                                />
                            </div>
                            <div className="col">
                                <select className='form-control my-3'
                                    value={item.parentId}
                                    onChange={(e) => handleCategoryUpdate('parentId', e.target.value, index, 'expanded')}
                                >
                                    <option value={0}>Select Category</option>
                                    {
                                        createCategoryList(category.categories).map((value) =>
                                            <option key={value.value} value={value.value}>{value.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col">
                                <select
                                    className='form-control my-3'

                                >
                                    <option value="select">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </div>
                            {/* selecting image for the category */}
                            < input type="file"
                                name='categoryImage'
                                onChange={handleImage}
                                placeholder='Choose Category Image'
                                className='form-control'
                            />
                        </div>
                    )
                }

                {/* for updating checked Array */}
                <div className="row" style={{ marginTop: '15px' }}>
                    <div className="col">
                        Checked Categories
                    </div>
                </div>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) =>
                        <div className="row" key={index}>
                            <div className="col">
                                <input
                                    className='form-control my-3'
                                    type="text"
                                    value={item.name}
                                    placeholder='Add Category Name'
                                    onChange={(e) => handleCategoryUpdate('name', e.target.value, index, 'checked')}
                                />
                            </div>
                            <div className="col">
                                <select className='form-control my-3'
                                    value={item.parentId}
                                    onChange={(e) => handleCategoryUpdate('parentId', e.target.value, index, 'checked')}
                                >
                                    <option value={0}>Select Category</option>
                                    {
                                        createCategoryList(category.categories).map((value) =>
                                            <option key={value.value} value={value.value}>{value.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col">
                                <select
                                    className='form-control my-3'

                                >
                                    <option value="select">Select Type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </div>
                            {/* selecting image for the category */}
                            < input type="file"
                                name='categoryImage'
                                onChange={handleImage}
                                placeholder='Choose Category Image'
                                className='form-control'
                            />
                        </div>
                    )
                }
            </Modal>
        )
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
                        {/* <ul> */}
                        {/* category is one of the reducer in the store and categories is one of initialState values in categoryReducer */}
                        {/* {renderCategories(category.categories)}
                        </ul> */}

                        {/* react checkbox tree implementation */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setchecked(checked)}
                            onExpand={expanded => setexpanded(expanded)}
                        />
                    </div>
                </div>

                {/* buttons for edit and delete category */}
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-primary">Delete</button>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onClick={editCategory}>Edit</button>
                    </div>
                </div>
            </div>

            {/* Modal for adding category */}
            {renderAddCategoryModal()}

            {/* Modal for editing category */}
            {renderUpdateCategoryModal()}
        </Layout>
    )
}

export default Category
