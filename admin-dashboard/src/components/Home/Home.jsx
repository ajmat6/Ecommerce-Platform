import React, {useState} from 'react'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Layout from '../Layout/Layout'
import './home.css'
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal/Modal'
import { addBanners } from '../../reducers/homePageReducer'

function Home(props) {
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth)

  const dispatch = useDispatch();

  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [banners, setbanners] = useState([]);

  const handleBannersSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    if(title.length === 0)
    {
      alert("Title is Required");
      return;
    }

    if(description.length === 0)
    {
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


  return (
    <Layout sidebar="true">
      <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#banners">
        Upload Banners
      </button>

      {renderBannersModal()}
    </Layout>
  )
}

export default Home
