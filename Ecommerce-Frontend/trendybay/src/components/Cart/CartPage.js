import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import Card from '../../UI/Card/Card'
import './cartPage.css'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { generatePublicURL } from '../../urlConfig'
import CartItem from '../CartItem/CartItem'
import { addToCart, getCartItems } from '../../reducers/cartReducer'
import { useDispatch } from 'react-redux'
import { MaterialButton } from '../MaterialUi/MaterialUi'
import { Link, useNavigate } from 'react-router-dom'
import PriceDetails from '../PriceDetails/PriceDetails'

const CartPage = (props) => {
    const cart = useSelector((state) => state.cart)
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // state to manage cartItems: cartItems is assigned cart.cartItems which is initially empty and it will not show items. So after addToCart Item is dispatched we have to set the cartItem state
    const [cartItems, setCartItems] = useState(cart.cartItems || {});

    // this useeffect is dependent on the cart.cartItems details and it will change it will chage the state of cartItems useState
    useEffect(() => {
        setCartItems(cart.cartItems || {});
    }, [cart.cartItems])

    useEffect(() => {
        if(auth.authenticate)
        {
            dispatch(getCartItems())
        }
    }, [auth.authenticate])

    // function to increase the quantity of the items in cart:
    const onQuantityIncrement = (_id, quantity) => {
        console.log(_id, quantity)
        const {name, price, img} = cartItems[_id];

        const product = {_id, name, price, img};
        dispatch(addToCart({product, qty: 1})) // quantity is one to add (+)
    }

    // function to increase the quantity of the items in cart:
    const onQuantityDecrement = (_id, quantity) => {
        console.log(_id, quantity)
        const {name, price, img} = cartItems[_id];

        const product = {_id, name, price, img};
        dispatch(addToCart({product, qty: -1})) // quantity is one to sub (-)
    }

    if(props.onlyCartItems)
    {
        return (
            <>
                {
                    cartItems !== null &&
                    Object.keys(cartItems).map((key, index) => 
                        <CartItem 
                            key = {index}
                            cartItem = {cartItems[key]} // passing cart item details as props
                            onQuantityInc = {onQuantityIncrement}
                            onQuantityDec = {onQuantityDecrement}
                        />
                    )
                }
            </>
        )
    }

  return (
    <Layout>
        <div className='cartContainer'>
            <Card
                headerLeft = {"My Cart"}
                headerRight = {"Deliver To"}
                style = {{width: "calc(100% - 400px)", overflow: "hidden"}}
            >
                {
                    cartItems !== null &&
                    Object.keys(cartItems).map((key, index) => 
                        <CartItem 
                            key = {index}
                            cartItem = {cartItems[key]} // passing cart item details as props
                            onQuantityInc = {onQuantityIncrement}
                            onQuantityDec = {onQuantityDecrement}
                        />
                    )
                }

                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        background: '#ffffff',
                        boxShadow: '0 0 10px 10px #eee',
                        padding: '10px 6px',
                        boxSizing: 'border-box'
                    }}
                >
                    <div style={{width: '250px'}}>
                        <MaterialButton
                            title = 'Place Order'
                            onClick = {() => navigate('/checkout')}
                        />
                    </div>
                </div>
            </Card>

            <PriceDetails
                totalItems = {Object.keys(cart.cartItems).reduce(function(qty, key){
                    return qty + cart.cartItems[key].quantity;
                }, 0)}

                totalPrice = {Object.keys(cart.cartItems).reduce(function(totalPrice, key){
                    return totalPrice + cart.cartItems[key].quantity * cart.cartItems[key].price;
                }, 0)}
            />
        </div>
    </Layout>
  )
}

export default CartPage                                                                                                                                                                    