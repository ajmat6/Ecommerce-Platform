import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { orderDetail } from '../../reducers/orderReducer';
import Card from '../../UI/Card/Card';
import './orderDetails.css'
import Price from '../Price/Price';
import { generatePublicURL } from '../../urlConfig';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.orders.orderDetails)
    const location = useLocation();
    console.log(location, "location")

    const orderId = location.pathname.split('/')[2] // finding order id from the url
    console.log(orderId, "orderId")

    useEffect(() => {
        console.log(orderId)
        const payload = {
            orderId
        }
        console.log(payload)

        dispatch(orderDetail(payload));
    }, [])

    if(!(orderDetails && orderDetails.address))
    {
        return null;
    }

    // function to format the date:
    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
        }
    }

    const formatDate2 = (date) => {
        const month = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        if (date) {
            const d = new Date(date);
            return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
        }
    };

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
                            <div className='delName'>{orderDetails.address.name}</div>
                            <div className='delAddress'>{orderDetails.address.address}</div>
                            <div className='delPhoneNumber'>Phone Number - {orderDetails.address.mobileNumber}</div>
                        </div>
                        <div className='delMoreActionContainer'>
                            <div className='delTitle'>More Actions</div>
                            <div className='delName'>Download Invoice</div>
                        </div>
                    </div>
                </Card>

                {orderDetails.items.map((item, index) => (
                    <Card
                        style={{ display: "flex", padding: "20px 0", margin: "10px 0" }}
                    >
                        <div className="flexRow">
                            <div className="delItemImgContainer">
                                <img src={generatePublicURL(item.productId.productPic[0].img)} alt="" />
                            </div>
                            <div style={{ width: "250px" }}>
                                <div className="delItemName">{item.productId.name}</div>
                                <Price value={item.payablePrice} />
                            </div>
                        </div>
                        <div style={{ padding: "25px 50px" }}>
                            <div className="orderTrack">
                                {orderDetails.orderStatus.map((status) => (
                                    <div
                                        className={`orderStatus ${status.isCompleted ? "active" : ""
                                            }`}
                                    >
                                        <div
                                            className={`point ${status.isCompleted ? "active" : ""}`}
                                        ></div>
                                        <div className="orderInfo">
                                            <div className="status">{status.type}</div>
                                            <div className="date">{formatDate(status.date)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ fontWeight: "500", fontSize: 14 }}>
                            {
                                orderDetails.orderStatus[3].isCompleted &&
                                `Delivered on ${formatDate2(orderDetails.orderStatus[3].date)}`
                            }
                        </div>
                    </Card>
                ))}
            </div>
        </Layout>
    )
}

export default OrderDetails