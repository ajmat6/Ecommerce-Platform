import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../../reducers/productDetailsReducer';
import { useLocation } from 'react-router-dom';
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUi/MaterialUi";
import "./productDetails.css";
import { generatePublicURL } from '../../urlConfig';
import { addToCart, addToCartDatabase, getCartItems } from '../../reducers/cartReducer';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const productDetail = useSelector((state) => state.productDetails)
    const auth = useSelector((state) => state.auth)
    const cart = useSelector((state) => state.cart)

    const location = useLocation();
    const productId = location.pathname.split("/")[2] // getting the id of the product
    console.log(productId)

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(productDetails(productId));
    }, [])

    // checking if the product details exist or not:
    if (Object.keys(productDetail.details).length === 0) return null;

    return (
        <Layout>
            <div className="productDescriptionContainer">
                <div className="flexRow">
                    <div className="verticalImageStack">
                        {productDetail.details.productPic.map((thumb, index) => (
                            <div className="thumbnail" key={index}>
                                <img src={generatePublicURL(thumb.img)} alt={thumb.img} />
                            </div>
                        ))}
                    </div>
                    <div className="productDescContainer">
                        <div className="productDescImgContainer">
                            <img
                                src={generatePublicURL(productDetail.details.productPic[0].img)}
                                alt={`${productDetail.details.productPic[0].img}`}
                            />
                        </div>

                        {/* action buttons */}
                        <div className="flexRow">
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="#ff9f00"
                                textColor="#ffffff"
                                style={{
                                    marginRight: "5px",
                                    marginTop: "10px"
                                }}
                                icon={<IoMdCart />}
                                onClick={() => {
                                    const { _id, name, price } = productDetail.details;
                                    const img = productDetail.details.productPic[0].img;

                                    const product = { _id, name, price, img };
                                    const isLoggedIn = auth.authenticate;

                                    // cart Details:
                                    const cartItems = cart.cartItems
                                    console.log(cartItems, "cartitems")

                                    // if user is logged in, then dispatch action of add to cart action of database:
                                    if (isLoggedIn)
                                    {
                                        dispatch(addToCart({ product, qty: 1, logIn: auth.authenticate }))
                                        const payload = {
                                            cartItems: [
                                                {
                                                    productId: product._id,
                                                    quantity: 1
                                                }
                                            ]
                                        }

                                        dispatch(addToCartDatabase(payload))
                                        .then((result) => {
                                            if(result)
                                            {
                                                dispatch(getCartItems())
                                                .then(() => {
                                                    navigate('/cart')
                                                })
                                            }
                                        })
                                    }

                                    else {
                                        dispatch(addToCart({ product, qty: 1, logIn: auth.authenticate }))
                                        navigate('/cart')
                                    }
                                }}
                            />

                            <MaterialButton
                                title="BUY NOW"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                style={{
                                    marginLeft: "5px",
                                    marginTop: "10px"
                                }}
                                icon={<AiFillThunderbolt />}
                            />
                        </div>
                    </div>
                </div>
                <div style={{ marginLeft: '15px' }}>
                    {/* home > category > subCategory > productName */}
                    <div className="breed">
                        <ul>
                            <li>
                                <a href="#">Home</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">Mobiles</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">Samsung</a>
                                <IoIosArrowForward />
                            </li>
                            <li>
                                <a href="#">{productDetail.details.name}</a>
                            </li>
                        </ul>
                    </div>
                    {/* product description */}
                    <div className="productDetails">
                        <p className="productTitle">{productDetail.details.name}</p>
                        <div>
                            <span className="ratingCount">
                                4.3 <IoIosStar />
                            </span>
                            <span className="ratingNumbersReviews">
                                72,234 Ratings & 8,140 Reviews
                            </span>
                        </div>
                        <div className="extraOffer">
                            Extra <BiRupee />
                            4500 off{" "}
                        </div>
                        <div className="flexRow priceContainer">
                            <span className="price">
                                <BiRupee />
                                {productDetail.details.price}
                            </span>
                            <span className="discount" style={{ margin: "0 10px" }}>
                                22% off
                            </span>
                            {/* <span>i</span> */}
                        </div>
                        <div>
                            <p
                                style={{
                                    color: "#212121",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                Available Offers
                            </p>
                            <p style={{ display: "flex" }}>
                                <span
                                    style={{
                                        width: "100px",
                                        fontSize: "12px",
                                        color: "#878787",
                                        fontWeight: "600",
                                        marginRight: "20px",
                                    }}
                                >
                                    Description
                                </span>
                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "#212121",
                                    }}
                                >
                                    {productDetail.details.description}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails