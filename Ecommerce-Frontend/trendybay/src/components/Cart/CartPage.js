import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import Card from '../../UI/Card/Card'
import './cartPage.css'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { generatePublicURL } from '../../urlConfig'
import CartItem from '../CartItem/CartItem'
import { addToCart } from '../../reducers/cartReducer'
import { useDispatch } from 'react-redux'

const CartPage = () => {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();

    // state to manage cartItems: cartItems is assigned cart.cartItems which is initially empty and it will not show items. So after addToCart Item is dispatched we have to set the cartItem state
    const [cartItems, setCartItems] = useState(cart.cartItems);

    // this useeffect is dependent on the cart.cartItems details and it will change it will chage the state of cartItems useState
    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems])

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
                            onQuantityInc = {onQuantityIncrement}
                            onQuantityDec = {onQuantityDecrement}
                        />
                    )
                }
            </Card>

            <Card
                headerLeft  = {"Price:"}
                style={{width: '500px'}}
            >
            
            </Card>
        </div>
    </Layout>
  )
}

export default CartPage