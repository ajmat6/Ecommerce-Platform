import React, {useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import './layout.css'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Layout(props) {
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if(!localStorage.getItem('token'))
    {
      navigate('/signin')
    }  
  }, [])  

  return (
    <>
        {
          // if a prop named sidebar is present then then show this (mainly for product and orders section) where prop.children will contain the jsx of products and orders component, otherwise it will show jsx of Home component
          props.sidebar ? 
          <div className='mx-3'>
              <div className='row'>
                <div className='col-md-2 sidebar' sidebar>
                  <ul>
                    <li><NavLink to='/'> Home </NavLink></li>
                    <li><NavLink to='/products'> Products </NavLink></li>
                    <li><NavLink to='/orders'> Orders </NavLink></li>
                    <li><NavLink to='/category'> Category </NavLink></li>
                  </ul>
                </div>
                <div className="col-md-10" style={{marginLeft: 'auto', paddingTop: '65px'}}>
                  {props.children}
                </div>
              </div>
          </div> : props.children
        }
    </>
  )
}

export default Layout
