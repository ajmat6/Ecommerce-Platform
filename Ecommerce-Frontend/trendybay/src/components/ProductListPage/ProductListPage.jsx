import React from "react";
import Layout from "../Layout/Layout";
import "./productList.css";
import ProductStore from "./productStore/ProductStore";
import { useLocation } from "react-router-dom";
import getQueryParams from "../../utils/getQueryParams";
import ProductPage from "./productPage/ProductPage";


const ProductListPage = (props) => {
  const location = useLocation(); // to access location of router just like props.location
  console.log(location)

  const renderProduct = () => {
    const allParams = getQueryParams(location.search) // will give category Id and  type of the page
    console.log(allParams) 
  
    // based on type of the page we are going to render diff page:
    let content = null;
    switch(allParams.type) // allParams contains type key in it
    {
      case "store" :
        content = <ProductStore {...props}/>
        break;
  
      case "page" :
        content = <ProductPage {...props}/>
        break;
  
      default :
        content = null;
    }

    return content;
  }

  
  return (
    <Layout>
      {renderProduct()}
    </Layout>
  );
};

export default ProductListPage;
