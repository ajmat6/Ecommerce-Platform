import React from 'react'
import Modal from '../../Modal/Modal';

const UpdateCategoriesModal = (props) => {
    // extracting everything from the props:
    const {
        expandedArray,
        checkedArray,
        handleUpdateCategoryModalSubmit,
        handleImage,
        handleCategoryUpdate,
        createCategoryList
    } = props;

    console.log({expandedArray, checkedArray})
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
                                    createCategoryList.map((value) =>
                                        <option key={value.value} value={value.value}>{value.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="col">
                            <select
                                className='form-control my-3'
                                value={item.type}
                                onChange={(e) => handleCategoryUpdate('type', e.target.value, index, 'expanded')}
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
                                    createCategoryList.map((value) =>
                                        <option key={value.value} value={value.value}>{value.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="col">
                            <select
                                className='form-control my-3'
                                value={item.type}
                                onChange={(e) => handleCategoryUpdate('type', e.target.value, index, 'checked')}
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

export default UpdateCategoriesModal;