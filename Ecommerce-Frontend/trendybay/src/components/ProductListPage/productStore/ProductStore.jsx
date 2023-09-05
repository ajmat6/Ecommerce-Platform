import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { productBySlug } from "../../../reducers/productBySlugReducer";
import { useParams } from "react-router-dom";
import { generatePublicURL } from "../../../urlConfig";

const ProductStore = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.productBySlug);

    const [priceRange, setpriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under20k: 20000,
        under30k: 30000,
        under50k: 50000,
        under100k: 100000,
        above100k: 100000,
    })

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
                        <div className="card">
                            <div className="card-header">
                                <div>{categoryName} Mobile under {priceRange[key]}</div>
                                <button className="btn btn-primary">View All</button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                {
                                    // here mapping is on the products of a particular category like under5k:
                                    allProducts.productsByPrice[key].map((product) => (
                                        <div className="product-container">
                                            <div className="product-img-container">
                                                <img
                                                    src={generatePublicURL(product.productPic[0].img)}
                                                    alt="realme"
                                                />
                                            </div>
                                            <div className="product-info">
                                                <div>{product.name}</div>
                                                <div>
                                                    {/* nbsp stands for non breaking space */}
                                                    <span>4.3</span> &nbsp;
                                                    <span>3334</span>
                                                </div>
                                                <div className="product-price">{product.price}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
}

export default ProductStore