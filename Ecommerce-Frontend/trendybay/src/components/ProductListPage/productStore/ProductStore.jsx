import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { productBySlug } from "../../../reducers/productBySlugReducer";
import { useParams } from "react-router-dom";
import { generatePublicURL } from "../../../urlConfig";
import {Link} from 'react-router-dom'
import './productStore.css'
import Card from "../../../UI/Card/Card";
import Rating from "../../Rating/Rating";
import Price from "../../Price/Price";

const ProductStore = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.productBySlug);

    // const [priceRange, setpriceRange] = useState({
    //     under5k: 5000,
    //     under10k: 10000,
    //     under20k: 20000,
    //     under30k: 30000,
    //     under50k: 50000,
    //     under100k: 100000,
    //    above100k: 100000,
    // })

    const priceRange = allProducts.priceRange;

    // useParams hook is used to identify last parameter in the routes -> eg: /product/realme , then useParams will give realme
    const slug = useParams();

    // as slug is coming as apple-3u94u3knj, then extracting apple from apple-3knknkn4 to use it at Apple mobiles under ...
    const splitSlug = slug.slug.split("-");
    const categoryName = splitSlug[0];


    useEffect(() => {
        console.log(slug);
        dispatch(productBySlug(slug.slug)); // slug is an object in whic slug key gives product category(eg realme)
    }, [slug.slug]);

    return (
        <>
            {
                // mapping of products according to price category:
                // as we can apply map function only to array, converting object(allProducts.productsBySlug) into array -> object.keys gives an array with a list of keys:
                Object.keys(allProducts.productsByPrice).map((key, index) => {
                    // key is under5k, etc
                    return (
                        <Card
                            // Passing headerLeft and headerRight and style as props to Card component
                            headerLeft = {`${categoryName} Mobile ${key === 'above100k' ? 'above' : 'under'} ${priceRange[key]}`}
                            headerRight = {<button className="btn btn-primary">View All</button>}
                            style = {{width: 'calc(100% - 40px)', margin: '20px'}}
                        >
                            {/* <div className="card-header">
                                <div>{categoryName} Mobile under {priceRange[key]}</div>
                                <button className="btn btn-primary">View All</button>
                            </div> */}

                            <div style={{ display: 'flex' }}>
                                {
                                    // here mapping is on the products of a particular category like under5k:
                                    allProducts.productsByPrice[key].map((product) => (
                                        <Link
                                            className="product-container" 
                                            style={{display: 'block'}}
                                            to={`/${product.slug}/${product._id}/p`}
                                        >
                                            <div className="product-img-container">
                                                <img
                                                    src={generatePublicURL(product.productPic[0].img)}
                                                    alt="realme"
                                                />
                                            </div>
                                            <div className="product-info">
                                                <div>{product.name}</div>
                                                <div style={{marginTop: '5px'}}>
                                                    {/* nbsp stands for non breaking space */}
                                                    <Rating value = {4.3}/>
                                                    <span
                                                        style={{
                                                            color: '#777',
                                                            fontWeight: '500',
                                                            fontSize: '14px',
                                                            marginLeft: '10px'
                                                        }}
                                                    >
                                                        (3334)
                                                    </span>
                                                </div>
                                                {/* <div className="product-price">{product.price}</div> */}
                                                <Price style = {{marginTop: '100px'}} value = {product.price}/>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </Card>
                    );
                })
            }
        </>
    );
}

export default ProductStore