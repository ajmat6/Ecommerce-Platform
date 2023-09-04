import React, { useState, useEffect } from 'react'
import Layout from '../Layout/Layout'
import Modal from '../Modal/Modal'
import { createCategoryList } from '../../helpers/linearCategoryList'
import { useDispatch, useSelector } from 'react-redux'
import { createPage } from '../../reducers/pageReducer'

const Page = () => {
    const category = useSelector((state) => state.category);
    const page = useSelector((state) => state.page);
    const dispatch = useDispatch();

    const [categories, setcategories] = useState([]);

    const [title, settitle] = useState('');
    const [categoryId, setcategoryId] = useState('');
    const [description, setdescription] = useState('');
    const [bannerImages, setbannerImages] = useState([]);
    const [productImages, setproductImages] = useState([]);
    const [type, settype] = useState('');


    // useEffect to get all the categories:
    useEffect(() => {
        setcategories(createCategoryList(category.categories));
        console.log(categories)
    }, [category]) // as initially category is empty and it takes some time to get category using useState, so it will give empty in console of categories. So use category as dependency

    // useEffect(() => {
    //     console.log(page)
    // }, [page])



    const handleCreatePageModalSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();

        if(title.length ===  0)
        {
            alert("Title is required");
            return;
        }

        if(categoryId.length === 0)
        {
            alert("Category is required");
            return;
        }

        form.append('title', title);
        form.append('description', description);
        form.append('categoryId', categoryId);
        form.append('type', type);

        bannerImages.forEach((banner, index) => {
            form.append('bannerImages', banner);
        })

        productImages.forEach((product, index) => {
            form.append('productImages', product);
        })

        dispatch(createPage(form));

        settitle('');
        setdescription('');
        setcategoryId('');
        setproductImages([]);
        setbannerImages([]);
        settype('');
    }

    const handleBannerImages = (e) => {
        setbannerImages([...bannerImages, e.target.files[0]]);
    }

    const handleProductImages = (e) => {
        setproductImages([...productImages, e.target.files[0]]);
    }

    const categoryChange = (e) => {
        setcategoryId(e.target.value);

        // as we have to find type of the selected category:
        const typeCategory = categories.find(category => category.value === e.target.value);
        console.log(typeCategory)
        settype(typeCategory.type)
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                modaltitle="Create New Page"
                add="Create Page"
                handleSubmit={handleCreatePageModalSubmit}
                modalId="createPage"
            >
                <input
                    type="text"
                    placeholder='Add Title'
                    className='form-control'
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                />

                <select
                    value={categoryId}
                    onChange={categoryChange}
                    className='form-control mt-3'
                >
                    <option value={0}>Select Category</option>
                    {
                        categories.map(cat =>
                            <option
                                key={cat.value}
                                value={cat.value}
                            >
                                {cat.name}
                            </option>
                        )
                    }
                </select>


                <input
                    type="text"
                    placeholder='Add Description'
                    className='form-control mt-3    '
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                />

                <label className='mt-3'>Banner Images</label>
                <input
                    type="file"
                    className='form-control mt-1 mb-1'
                    onChange={handleBannerImages}
                />

                {
                    bannerImages.length > 0 ? bannerImages.map((banner, index) => <div key={index}>{banner.name}</div>) : null
                }

                <label className='mt-3'>Product Images</label>
                <input
                    type="file"
                    className='form-control mt-1 mb-1'
                    onChange={handleProductImages}
                />
                {
                    productImages.length > 0 ? productImages.map((product, index) => <div key={index}>{product.name}</div>) : null
                }

                <input
                    type="text" 
                    className='form-control mt-3'
                    value={type}
                    // onChange={(e) => settype(e.target.value)}
                    placeholder='Select Category for Type of Page'
                />
            </Modal>
        )
    }

    return (
        <Layout sidebar="true">
            {
                page.loading ? 
                <p>Creating Page.... Please Wait</p>
                :
                <>
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPage">
                        Create Page
                    </button>
                </>
            }

            {renderCreatePageModal()}
        </Layout>
    )
}

export default Page