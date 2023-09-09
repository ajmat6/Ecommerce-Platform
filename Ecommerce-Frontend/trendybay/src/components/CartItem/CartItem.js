import React from 'react'
import { generatePublicURL } from '../../urlConfig';
import './cartItem.css'

const CartItem = (props) => {
    // extracting cart item details passed as props
    const {_id, name, price, quantity, img} = props.cartItem;

    return (
        <div className='cartItemContainer'>
            <div className='flexRow'>
                <div className='cartProImgContainer'>
                    <img src={generatePublicURL(img)} alt=''/>
                </div>

                <div className='cartItemDetails'>
                    <div>
                        <p>{name}</p>
                        <p>Rs. {price}</p>
                    </div>
                    <div>
                        Delivery in 3-5 Days
                    </div>
                </div>
            </div>

            <div style={{display: 'flex', margin: '7px 0'}}>
                <div className='quantityControl'>
                    <button>-</button>
                    <input value={quantity} readOnly/>
                    <button>+</button>
                </div>

                <button className='cartActionBtn'>Save for later</button>
                <button className='cartActionBtn'>Remove</button>
            </div>
        </div>
    )
}

export default CartItem