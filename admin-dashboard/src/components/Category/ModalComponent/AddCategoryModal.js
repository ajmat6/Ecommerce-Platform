import React from 'react'
import Modal from '../../Modal/Modal'

const AddCategoryModal = (props) => {
    const {
        handleCategorySelection,
        categoryName,
        setcategoryName,
        parentCategoryId,
        setparentCategoryId,
        createCategoryList,
        handleImage
    } = props

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
                    createCategoryList.map((value) =>
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

export default AddCategoryModal;