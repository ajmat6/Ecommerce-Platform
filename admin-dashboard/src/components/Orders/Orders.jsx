import React from 'react'
import Layout from '../Layout/Layout'
import Card from '../Card/Card'
import { useSelector, useDispatch } from 'react-redux'
import './orders.css'
import { useEffect } from 'react'
import { getOrders, orderUpdate } from '../../reducers/orderReducer'
import { useState } from 'react'

function Orders() {
  const order = useSelector((state) => state.order)
  const dispatch = useDispatch();

  const [type, setType] = useState('');

  useEffect(() => {
    dispatch(getOrders());
  }, [])

  // function to do action on an order and to change its status:
  const orderAction = (orderId, userId) => {
    const payload = {
      orderId: orderId,
      type: type
    }

    dispatch(orderUpdate(payload))
    .then((result) => {
      if(result)
      {
        dispatch(getOrders())
      }
    })
  }

  return (
    <Layout sidebar="true">
      {
        order.orders.map((order, index) => (
          <Card
            headerLeft={`ID: ${order._id}`}
            style={{
              margin: '10px 0'
            }}
          >
            {/* Div that will show order details */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "50px 50px",
                alignItems: "center",
              }}
            >
              <div> 
                {/* To show names of the ordered items */}
                <div className='title'>Items</div>
                {
                  order.items.map((item, index) => (
                    <div key={index} className='value'>
                      {item.productId.name}
                    </div>
                  ))
                }
              </div>
              <div>
                <span className='title'>TotalPrice</span>
                <br />
                <span className='value'>{order.totalAmount}</span>
              </div>
              <div>
                <span className='title'>Payment Type</span>
                <br />
                <span className='value'>{order.paymentType}</span>
              </div>
              <div>
                <span className='title'>Payment Status</span>
                <br />
                <span className='value'>{order.paymentStatus}</span>
              </div>
            </div>

            <div
              style={{
                boxSizing: 'border-box',
                padding: '100px',
                display: 'flex',
                alignItems: 'center',
                marginLeft: '22px'
              }}
            >
              {/* div that will show order track */}
              <div 
                className='orderTrack'
              >
                {
                  order.orderStatus.map((status, index) => (
                    <div
                      className={`orderStatus ${status.isCompleted ? 'active' : ''}`}
                    >
                      <div
                        className={`point ${status.isCompleted ? 'active' : ''}`}
                      >

                      </div>
                      <div className='orderInfo'>
                        <div className='status'>{status.type}</div>
                        <div className='date'>{status.date}</div>
                      </div>
                    </div>
                  ))
                }       
              </div>

              {/* input to apply order action */}
              <div
                style={{
                  padding: '0 30px',
                  boxSizing: 'border-box'
                }}
              >
                <select onChange={(e) => setType(e.target.value)}>
                  <option value="0">Select Order Status</option>
                  {
                    order.orderStatus.map((status, index) => {
                      return (
                        <>
                          {
                            !status.isCompleted &&
                            <option key={index} value={status.type}>{status.type}</option>
                          }
                        </>
                      )
                    })
                  }
                </select>
              </div>
              <div
              >
                <button className='btn btn-primary' onClick={() => orderAction(order._id, order.userId)}>Confirm</button>
              </div>
            </div>
          </Card>
        ))
      }
    </Layout>
  )
}

export default Orders
