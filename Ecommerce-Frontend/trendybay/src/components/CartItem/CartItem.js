import React, {useState} from 'react'
import { generatePublicURL } from '../../urlConfig';
import './cartItem.css'

const CartItem = (props) => {
    const [quantity, setQuantity] = useState(props.cartItem.quantity);

    // extracting cart item details passed as props
    const {_id, name, price, img} = props.cartItem;

    // functions to set the quantity of useState quantity and passing it as prop to cartPage as prop argument
    const onQuantityIncreament = () => {
        setQuantity(quantity + 1);
        props.onQuantityInc(_id, quantity + 1); // passing argument to props function
    }

    const onQuantityDecreament = () => {
        if(quantity == 1) return; // if quantity is one, you cannot decrease it more
        setQuantity(quantity - 1);
        props.onQuantityDec(_id, quantity - 1); // passing argument to props function
    }

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
                    <button onClick={onQuantityDecreament}>-</button>
                    <input value={quantity} readOnly/>
                    <button onClick={onQuantityIncreament}>+</button>
                </div>

                <button className='cartActionBtn'>Save for later</button>
                <button className='cartActionBtn'>Remove</button>
            </div>
        </div>
    )
}

export default CartItem