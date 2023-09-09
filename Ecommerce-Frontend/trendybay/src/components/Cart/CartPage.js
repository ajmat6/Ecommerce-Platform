import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import Card from '../../UI/Card/Card'
import './cartPage.css'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { generatePublicURL } from '../../urlConfig'
import CartItem from '../CartItem/CartItem'

const CartPage = () => {
    const cart = useSelector((state) => state.cart)

    // state to manage cartItems: cartItems is assigned cart.cartItems which is initially empty and it will not show items. So after addToCart Item is dispatched we have to set the cartItem state
    const [cartItems, setCartItems] = useState(cart.cartItems);

    // this useeffect is dependent on the cart.cartItems details and it will change it will chage the state of cartItems useState
    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems])

  return (
    <Layout>
        <div className='cartContainer'>
            <Card
                headerLeft = {"My Cart"}
                headerRight = {"Deliver To"}
            >
                {
                    Object.keys(cartItems).map((key, index) => 
                        <CartItem 
                            key = {index}
                            cartItem = {cartItems[key]} // passing cart item details as props
                        />
                    )
                }
            </Card>

            <Card style={{width: '500px'}}>
                Price: 
            </Card>
        </div>
    </Layout>
  )
}

export default CartPage