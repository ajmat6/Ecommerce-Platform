import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { orderDetail } from '../../reducers/orderReducer';
import Card from '../../UI/Card/Card';
import './orderDetails.css'

const OrderDetails = () => {
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orders.orderDetails)
    const location = useLocation();
    // console.log(location, "location")

    const orderId = location.pathname.split('/')[2] // finding order id from the url
    // console.log(orderId, "orderId")
    
    useEffect(() => {
        console.log(orderId)
        const payload = {
            orderId
        }
        // console.log(payload)

        dispatch(orderDetail(payload));
    }, [])

    // if(!(orderDetails && orderDetails.address))
    // {
    //     return null;
    // }

  return (
    <Layout>
        <div
            style={{
                width: '1160px',
                margin: '10px auto'
            }}
        >
            <Card>
                <div className='delAdrContainer'>
                    <div className='delAdrDetails'>
                        <div className='delTitle'>Delivery Address</div>
                        <div className='delName'>Delivery Address</div>
                        <div className='delAddress'>Delivery Address</div>
                        <div className='delPhoneNumber'>
                            Delivery Address
                        </div>
                    </div>
                    <div className='delMoreActionContainer'>
                        <div className='delTitle'>More Actions</div>
                        <div className='delName'>DownLoad Invoice</div>
                    </div>
                </div>
            </Card>

            <Card>
                <div>
                    <div>Items</div>
                    <div>Order Status</div>
                    <div>Order Status</div>
                </div>
            </Card>
        </div>
    </Layout>
  )
}

export default OrderDetails