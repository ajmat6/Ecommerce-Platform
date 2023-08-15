import React from 'react'
import Modal from '../../Modal/Modal'

const DeleteCategoryModal = (props) => {
    // console.log('delete', checkedArray)
    const {
        handleDeleteCategoryModalSubmit,
        expandedArray,
        checkedArray
    } = props

    return (
        <Modal 
        modaltitle={"Delete Category"} 
        // handleSubmit={handleDeleteCategoryModalSubmit} 
        add="Delete" 
        modalId="deleteModal"
        buttons={[
            {
                label: 'No',
                color: 'primary',
                onClick: () => {
                    alert('No');
                }
            },

            {
                label: 'Yes',
                color: 'danger',
                onClick: handleDeleteCategoryModalSubmit
            }
        ]}
        >
            {/* showing admin the categories that he has selected to delete */}

            {/* for updating expanded Array */}
            <div className="row mb-3 form-control">
                <div className="col">
                    Expanded Categories
                </div>
            </div>
            {
                expandedArray.length > 0 && expandedArray.map((item, index) => 
                    <span key={index} className='mx-3'>{item.name}</span>
                )
            }

            {/* for updating expanded Array */}
            <div className="row my-3 form-control">
                <div className="col">
                    Checked Categories
                </div>
            </div>
            {
                checkedArray.length > 0 && checkedArray.map((item, index) => 
                    <span key={index} className='mx-3'>{item.name}</span>
                )
            }

        </Modal>
    )
}

export default DeleteCategoryModal;