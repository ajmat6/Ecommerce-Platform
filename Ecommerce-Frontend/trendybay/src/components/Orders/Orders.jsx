import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import Card from '../../UI/Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../reducers/orderReducer'
import { generatePublicURL } from '../../urlConfig'
import './orders.css'
import { Breed } from '../MaterialUi/MaterialUi'
import { IoIosArrowForward } from 'react-icons/io'
import { BiRupee } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Orders = () => {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(getOrders());
    }, [])

  return (
    <Layout>
        <div style={{maxWidth: '1160px', margin: '10px auto'}}>
            <Breed
                breed = {[
                    {name: "Home", href: '/'},
                    {name: "My Account", href: '/account'},
                    {name: "My Orders", href: '/account/orders'}
                ]}
                breedIcon = {<IoIosArrowForward />}
            />
            {
                order.orders.map((order, index) => 
                    order.items.map((item, index) => 
                        <Card
                            style = {{
                                maxWidth: '1200px',
                                margin: '5px auto'
                            }}
                        >
                            <Link 
                                className='orderItemContainer'
                                to={`/orderDetails/${order._id}`}
                                style={{textDecoration: 'none', color: 'black'}}
                            >
                                <div className='orderImgContainer'>
                                    <img className='orderImg'
                                        src={generatePublicURL(item.productId.productPic[0].img)}
                                    />
                                </div>
                                <div className='orderRow'>
                                    <div className='orderName'>{item.productId.name}</div>
                                    <div className='orderPrice'>
                                        <BiRupee />
                                        {item.payablePrice}
                                    </div>
                                    <div>{order.paymentStatus}</div>
                                </div>
                            </Link>
                        </Card>
                    )
                )
            }
        </div>
    </Layout>
  )
}

export default Orders