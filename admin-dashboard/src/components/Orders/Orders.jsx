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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "50px 50px",
                alignItems: "center",
              }}
            >
              <div className='orderTrack'>
                <div className='orderStatus'>
                  <div className='point'></div>
                  <div className='orderInfo'>
                    <div className='status '>Ordered</div>
                    <div className='date'>Fri, 2020</div>
                  </div>
                </div>
              </div>

              <div className='orderTrack'>
                <div className='orderStatus'>
                  <div className='point'></div>
                  <div className='orderInfo'>
                    <div className='status '>Packed</div>
                    <div className='date'>Sat, 2020</div>
                  </div>
                </div>
              </div>

              <div className='orderTrack'>
                <div className='orderStatus'>
                  <div className='point'></div>
                  <div className='orderInfo'>
                    <div className='status '>Shipped</div>
                    <div className='date'>Sat, 2020</div>
                  </div>
                </div>
              </div>

              <div className='orderTrack'>
                <div className='orderStatus'>
                  <div className='point'></div>
                  <div className='orderInfo'>
                    <div className='status '>Delivered</div>
                    <div className='date'>Sun, 2020</div>
                  </div>
                </div>
              </div>

              {/* input to apply order action */}
              <div>
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
              <div>
                <button className='btn btn-primary' style={{ marginLeft: '10px' }} onClick={() => orderAction(order._id, order.userId)}>Confirm</button>
              </div>
            </div>
          </Card>
        ))
      }
    </Layout>
  )
}

export default Orders
