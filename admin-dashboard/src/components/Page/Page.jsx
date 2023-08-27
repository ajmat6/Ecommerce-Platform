import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import Modal from '../Modal/Modal'
import { createCategoryList } from '../../helpers/linearCategoryList'
import { useSelector } from 'react-redux'

const Page = () => {
    const category = useSelector((state) => state.category);

    const [title, settitle] = useState('');
    const [categories, setcategories] = useState([]);

    // useEffect to get all the categories:
    useEffect(() => {
      setcategories(createCategoryList(category.categories));
      console.log(categories)
    }, [])
    
    

    const handleCreatePageModalSubmit = () => {

    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                modaltitle = "Create New Page"
                add = "Create Page"
                handleSubmit = {handleCreatePageModalSubmit}
                modalId = "createPage"
            >
                <input
                type="text"
                placeholder='Add Title'
                className='form-control' 
                value={title}
                onChange={(e) => settitle(e.target.value)}
                />
            </Modal>
        )
    }

  return (
    <Layout sidebar>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPage">
            Create Page
        </button>

        {renderCreatePageModal()}
        {/* <Modal
            modaltitle = "Create New Page"
            add = "Create Page"
            handleSubmit = {handleCreatePageModalSubmit}
            modalId = "createPage"
        >
            <input
              type="text"
              placeholder='Add Title'
              className='form-control' 
            />
        </Modal> */}
    </Layout>
  )
}

export default Page