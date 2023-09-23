import React from 'react'
import Navbar from '../Navbar/Navbar'
import CategoryMenu from '../CategoryMenu/CategoryMenu'
import Footer from '../Footer/Footer'

const Layout = (props) => {
  return (
    <>
        <Navbar />
        <CategoryMenu />
        {props.children}
        <Footer />
    </>
  )
}

export default Layout