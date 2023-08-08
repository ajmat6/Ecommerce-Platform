import React from 'react'
import Navbar from '../Navbar/Navbar'
import CategoryMenu from '../CategoryMenu/CategoryMenu'

const Layout = (props) => {
  return (
    <>
        <Navbar />
        <CategoryMenu />
        {props.children}
    </>
  )
}

export default Layout