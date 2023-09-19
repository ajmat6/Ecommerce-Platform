import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productBySlug } from "../../../reducers/productBySlugReducer";
import { useParams } from "react-router-dom";
import { generatePublicURL } from "../../../urlConfig";
import {Link} from 'react-router-dom'
import './GeneralProductPage.css'
import Card from "../../../UI/Card/Card";
import { BiRupee } from "react-icons/bi";

const GeneralProductsPage = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.productBySlug);

    // useParams hook is used to identify last parameter in the routes -> eg: /product/realme , then useParams will give realme
    const slug = useParams();

    // as slug is coming as apple-3u94u3knj, then extracting apple from apple-3knknkn4 to use it at Apple mobiles under ...
    const splitSlug = slug.slug.split("-");
    const categoryName = splitSlug[0];


    useEffect(() => {
        dispatch(productBySlug(slug.slug)); // slug is an object in whic slug key gives product category(eg realme)
    }, [slug.slug]);

    return (
        <div style={{padding: '10px'}}>
            <Card
                style = {{
                    boxSizing: 'border-box',
                    padding: '10px',
                    display: 'flex'
                }}
            >
                {
                    allProducts.products.map((product, item) => 
                        <div className="caContainer">
                            <Link
                                className="caImgContainer"
                                to={`/${product.slug}/${product._id}/p`}
                            >
                                <img src={generatePublicURL(product.productPic[0].img)} alt="Product Pic" />
                            </Link>
                            <div className="caProductName">{product.name}</div>
                            <div className="carProductPrice">
                                <BiRupee />
                                {product.price}
                            </div>
                        </div>
                    )
                }
            </Card>
        </div>
    );
}

export default GeneralProductsPage