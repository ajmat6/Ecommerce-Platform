import React, { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Layout from '../Layout/Layout'
import './home.css'
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal/Modal'
import { addBanners, addHomeProduct, addTopic } from '../../reducers/homePageReducer'
import { AiOutlinePlus } from 'react-icons/ai'

function Home(props) {
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const category = useSelector((state) => state.category);
  const home = useSelector((state) => state.home)

  const dispatch = useDispatch();

  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [banners, setbanners] = useState([]);

  const [topicTitle, setTopicTitle] = useState('');

  const [productTitle, setProductTitle] = useState('');
  const [productCategory, setproductCategory] = useState('');
  const [productTopic, setproductTopic] = useState('');
  const [frontPrice, setfrontPrice] = useState('');
  const [productPic, setProductPic] = useState('');


  // creating a list of categories:
  const createCategoryList = (categories, option = []) => {
    for (let category of categories) {
      option.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type
      });

      if (category.children.length > 0) {
        createCategoryList(category.children, option)
      }
    }

    return option;
  }

  // creating a list of categories:
  const createTopicList = (topics, option = []) => {
    for (let topic of topics) {
      option.push({
        value: topic._id,
        title: topic.title,
      });
    }

    return option;
  }

  const handleBannersSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    if (title.length === 0) {
      alert("Title is Required");
      return;
    }

    if (description.length === 0) {
      alert("Description is Required");
      return;
    }

    form.append('title', title);
    form.append('description', description);

    banners.forEach((banner, index) => {
      form.append('banners', banner);
    })
    // form.append('banners', banners[0])

    console.log(form)

    dispatch(addBanners(form));
  }

  const handleBanners = (e) => {
    setbanners([...banners, e.target.files[0]]);
  }

  const handleProductImage = (e) => {
    setProductPic(e.target.file);
  }

  const handleTopicSubmit = (e) => {
    e.preventDefault();

    dispatch(addTopic({ title: topicTitle }));
  }

  const handleProductsSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: productTopic,
      products: {
        productName: productTitle,
        categoryId: productCategory,
        startingPrice: frontPrice,
        productPic: productPic
      }
    }
    // const form = new FormData();

    // form.append('productName', productTitle);
    // form.append('categoryId', productCategory);
    // form.append('startingPrice', frontPrice);
    // form.append('title', )
    dispatch(addHomeProduct(payload))
  }

  const renderTopicModal = () => {
    return (
      <Modal
        modaltitle="Add Home Page Topic"
        add="Add Topic"
        handleSubmit={handleTopicSubmit}
        modalId="topic"
      >
        <input
          type="text"
          placeholder='Add Topic Title'
          className='form-control'
          value={topicTitle}
          onChange={(e) => setTopicTitle(e.target.value)}
        />
      </Modal>
    )
  }

  const renderBannersModal = () => {
    return (
      <Modal
        modaltitle="Add Home Page Banners"
        add="Add Banners"
        handleSubmit={handleBannersSubmit}
        modalId="banners"
      >
        <input
          type="text"
          placeholder='Add Title'
          className='form-control'
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />

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
          onChange={handleBanners}
        />

        {
          banners.length > 0 ? banners.map((banner, index) => <div key={index}>{banner.name}</div>) : null
        }
      </Modal>
    )
  }

  const renderProductsModal = () => {
    return (
      <Modal
        modaltitle="Add Home Page Products"
        add="Add Product"
        handleSubmit={handleProductsSubmit}
        modalId="products"
      >
        {/* Selecting the topic of the product */}
        <select
          className="form-control my-3"
          value={productTopic}
          onChange={(e) => setproductTopic(e.target.value)}
        >
          <option value={0}>Select Product Topic</option>
          {createTopicList(home.topics).map((value) => (
            <option key={value.value} value={value.value}>
              {value.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder='Add Product Title'
          className='form-control'
          value={productTitle}
          onChange={(e) => setProductTitle(e.target.value)}
        />

        <select
          className="form-control my-3"
          value={productCategory}
          onChange={(e) => setproductCategory(e.target.value)}
        >
          <option value={0}>Select Category</option>
          {createCategoryList(category.categories).map((value) => (
            <option key={value.value} value={value.value}>
              {value.name}
            </option>
          ))}
        </select>

        <input
          type='number'
          placeholder='Add Front Price'
          className='form-control'
          value={frontPrice}
          onChange={(e) => setfrontPrice(e.target.value)}
        />

        <label className='mt-3' style={{ marginLeft: '5px' }}>Product Image</label>
        <input
          type="file"
          className='form-control mt-1 mb-1'
          onChange={handleProductImage}
        />

        {
          productPic != '' ? <div>{productPic}</div> : null
        }
      </Modal>
    )
  }


  return (
    <Layout sidebar="true">
      <div className='container'>
        <div className="row">
          <div className='col-md-12'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Home</h3>
              <div className='actionButtons' style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>Actions:</span>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#banners"><AiOutlinePlus style={{ marginRight: '4px' }} /><span style={{ textAlign: 'center' }}>Add Banners</span></button>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#topic"><AiOutlinePlus style={{ marginRight: '4px' }} /><span>Add Topics</span></button>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#products"><AiOutlinePlus style={{ marginRight: '4px' }} /><span>Add Product</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {renderBannersModal()}
      {renderTopicModal()}
      {renderProductsModal()}
    </Layout>
  )
}

export default Home
